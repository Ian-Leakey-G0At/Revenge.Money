import { POST } from '@/app/api/internal/fulfillment-trigger/route';
import { NextRequest } from 'next/server';
import { courses } from '@/lib/placeholder-data';

jest.mock('@upstash/redis', () => ({
  Redis: {
    fromEnv: jest.fn(() => ({
      set: jest.fn().mockResolvedValue('OK'),
    })),
  },
}));

jest.mock('resend', () => ({
  Resend: jest.fn(() => ({
    emails: {
      send: jest.fn().mockResolvedValue({ id: 'mocked_email_id' }),
    },
  })),
}));

jest.mock('@react-email/render', () => ({
    render: jest.fn().mockReturnValue('<!DOCTYPE html><html><body>Mocked Email</body></html>'),
}));

describe('Fulfillment Trigger API', () => {
  const internalSecret = 'test-secret';
  process.env.INTERNAL_API_SECRET_KEY = internalSecret;

  it('should return 401 Unauthorized if the auth token is missing or invalid', async () => {
    const invalidAuthRequest = new NextRequest('http://localhost', {
      method: 'POST',
      headers: { 'Authorization': 'Bearer wrong-secret' },
      body: JSON.stringify({
        eventType: 'FULFILLMENT_REQUEST',
        payload: { customerEmail: 'test@example.com', courseId: 'guy-fawkes-1' },
      }),
    });

    const noAuthRequest = new NextRequest('http://localhost', {
        method: 'POST',
        body: JSON.stringify({
          eventType: 'FULFILLMENT_REQUEST',
          payload: { customerEmail: 'test@example.com', courseId: 'guy-fawkes-1' },
        }),
      });

    const invalidResponse = await POST(invalidAuthRequest);
    expect(invalidResponse.status).toBe(401);

    const noAuthResponse = await POST(noAuthRequest);
    expect(noAuthResponse.status).toBe(401);
  });

  it('should return 404 Not Found if the courseId does not exist', async () => {
    const request = new NextRequest('http://localhost', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${internalSecret}` },
      body: JSON.stringify({
        eventType: 'FULFILLMENT_REQUEST',
        payload: { customerEmail: 'test@example.com', courseId: 'non-existent-course' },
      }),
    });

    const response = await POST(request);
    expect(response.status).toBe(404);
  });

  it('should return 200 OK and send an email for a valid request', async () => {
    const validCourseId = courses[0].id;
    const request = new NextRequest('http://localhost', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${internalSecret}` },
      body: JSON.stringify({
        eventType: 'FULFILLMENT_REQUEST',
        payload: { customerEmail: 'success@example.com', courseId: validCourseId },
      }),
    });

    const response = await POST(request);
    expect(response.status).toBe(200);
  });

  it('should return 200 OK if the eventType is not FULFILLMENT_REQUEST', async () => {
    const request = new NextRequest('http://localhost', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${internalSecret}` },
      body: JSON.stringify({
        eventType: 'SOME_OTHER_EVENT',
        payload: {},
      }),
    });

    const response = await POST(request);
    expect(response.status).toBe(200);
  });

  it('should return 400 Bad Request for a malformed payload', async () => {
    const request = new NextRequest('http://localhost', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${internalSecret}` },
      body: JSON.stringify({
        eventType: 'FULFILLMENT_REQUEST',
        payload: { customerEmail: 123, courseId: null }, // Invalid types
      }),
    });

    const response = await POST(request);
    expect(response.status).toBe(400);
  });
});
