### Room Booking Mobile Application

A React Native Mobile App that demonstrates API Integration, data manipulation and device specific functionality.

This app aims to demonstrate the following:

* Fetches data from a REST API.   
* Sorts and displays the data dynamically.   
* Integrates a device-specific feature (e.g., camera).   
* Includes tests for critical functionality.

### Setup and Run Instructions

[Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).


1. Install dependencies: `npm install`
2. Start app: `npx expo start`
3. To view in 'app view', visit localhost:8081 and toggle device toolbar.

### Project Structure

```
/room-booking-mobile
│── /services           # Services e.g. API call, data fetching
│── /app                # App navigation (File based - file structure determines app navigation)
│── /components         # Reusable components
│── /types              # Global types
│── package.json        # Dependencies and scripts
│── tsconfig.json       # TypeScript config
```


**Others:**

Project uses [file-based routing](https://docs.expo.dev/router/introduction).

* Use [https://imagecolorpicker.com/](https://imagecolorpicker.com/) to get color from figma to the app.