# RevengeLearn: Frontend-Backend Integration Playbook

This document serves as the official contract between the frontend and backend teams for the RevengeLearn application. It details the API endpoints and the exact data structures expected by the frontend components. Adhering to these contracts is crucial for ensuring seamless integration.

## API Contracts by Route

### `/api/courses`

- **Method:** `GET`
- **Description:** Fetches a list of all available courses.
- **Used By:** `CourseCard` component (`/courses` page)
- **Expected Response Shape:** `Array<Course>`

```json
[
  {
    "id": "string",
    "title": "string",
    "description": "string",
    "imageId": "string",
    "price": "number",
    "studentsCount": "number",
    "modules": [
      {
        "id": "string",
        "title": "string",
        "lessons": [
          {
            "id": "string",
            "title": "string",
            "duration": "number",
            "isCompleted": "boolean",
            "isLocked": "boolean"
          }
        ]
      }
    ],
    "purchased": "boolean"
  }
]
```
