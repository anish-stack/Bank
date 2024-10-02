
# Bank Information API

## Overview

This API manages bank information for users, allowing the creation, retrieval, updating, and deletion of bank records. Built using Express and MongoDB.

## Base URL

http://localhost:7000/api/v1/bank


## Endpoints

### 1. Create Bank Information
- **URL:** `/Create-info`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
      "PersonName": "John Doe",
      "MobileNumber": "1234567890",
      "PanCard": "ABCDE1234F",
      "CardNumber": "1234567812345678",
      "CardDigit": "123",
      "ExpiryDate": "12/25",
      "Cvv": "123"
  }


Success (201):
{
    "message": "Bank info created successfully",
    "data": data
}

**Get All Bank Information**
URL: /get-info
Method: GET
Response:
Success (200):
- **Request Body:**
  ```json

    {
        "PersonName": "John Doe",
        "MobileNumber": "1234567890",
        "PanCard": "ABCDE1234F",
        "CardNumber": "1234567812345678",
        "CardDigit": "123",
        "ExpiryDate": "12/25",
        "Cvv": "123",
        "createdAt": "2024-10-01T12:00:00Z",
        "updatedAt": "2024-10-01T12:00:00Z",
        "_id": "60d21b4667d0d8992e610c85"
    }


**Update Bank Information**
URL: /update-info/:id
Method: PUT

- **Request Body:**
  ```json
  {
    "PersonName": "Jane Doe",
    "MobileNumber": "0987654321"
  }
Success (200):

{
    "message": "Bank info updated successfully",
    "data": updated data
}


**Delete Bank Information**
URL: /delete-info/:id
Method: DELETE
Response:

Success (200): {"message": "Bank info deleted successfully"}
Error (404): {"error": "Bank info not found"}


**Error Handling**
400 Bad Request: Invalid request data or missing fields.
404 Not Found: Record not found for update or delete operations.
500 Internal Server Error: Server-related issues.
