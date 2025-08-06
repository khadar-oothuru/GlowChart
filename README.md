# GlowCart - Beauty E-commerce App

A React Native CLI application for beauty and cosmetic products, built as part of a technical assignment.

## 🌟 Features

### Completed Screens
1. **Onboarding Screen** - Welcome screen with app branding and "Get Started" button
2. **Login Screen** - Email/password authentication with social login options (UI only)
3. **Register Screen** - Account creation with form validation
4. **Home/Product List Screen** - Display of beauty products with search functionality
5. **Product Details Screen** - Detailed product view with reviews and "Add to Bag" functionality
6. **Profile Screen** - User profile with settings and logout functionality

### Key Features
- ✅ **React Navigation** for screen transitions
- ✅ **Context API** for state management
- ✅ **Axios** for API calls
- ✅ **FlatList** for efficient product rendering
- ✅ **Custom reusable components** (Button, ProductCard, Header)
- ✅ **Clean architecture** with proper folder structure
- ✅ **API integration** with dummyjson.com
- ✅ **Error handling** and loading states
- ✅ **Responsive design** for different screen sizes

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Button.tsx      # Custom button component
│   ├── Header.tsx      # App header component
│   └── ProductCard.tsx # Product card component
├── context/            # State management
│   └── AppContext.tsx  # Global app state
├── navigation/         # Navigation configuration
│   └── AppNavigator.tsx # Main navigation stack
├── screens/           # App screens
│   ├── OnboardingScreen.tsx
│   ├── LoginScreen.tsx
│   ├── RegisterScreen.tsx
│   ├── HomeScreen.tsx
│   ├── ProductDetailScreen.tsx
│   └── ProfileScreen.tsx
├── services/          # API services
│   └── api.ts         # API integration
└── assets/           # Images and other assets
```

## 📊 API Integration

The app integrates with `https://dummyjson.com/products` to fetch product data. Products are filtered to show cosmetic/beauty-related items, with fallback mock data for better demonstration.

## ⏱️ Development Time

Approximate time spent on development:
- **Initial Setup & Architecture**: 2 hours
- **Component Development**: 4 hours
- **Screen Implementation**: 6 hours
- **API Integration**: 2 hours
- **Testing & Refinements**: 2 hours
- **Total Time**: ~16 hours

## 🛠️ Technical Requirements Met

- ✅ React Native CLI project setup
- ✅ React Navigation implementation
- ✅ Axios for API calls
- ✅ Context API for state management
- ✅ FlatList for product rendering
- ✅ Custom reusable components
- ✅ StyleSheet API for styling
- ✅ Dynamic data usage (no hardcoding)
- ✅ Clean code architecture
- ✅ Modular folder structure

# Getting Started

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

## Step 1: Start Metro

First, you will need to run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### Android

```sh
# Using npm
npm run android
# OR using Yarn
yarn android
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

## Step 3: Modify your app

Now that you have successfully run the app, let's make changes!

Open `App.tsx` in your text editor of choice and make some changes. When you save, your app will automatically update and reflect these changes — this is powered by [Fast Refresh](https://reactnative.dev/docs/fast-refresh).

When you want to forcefully reload, for example to reset the state of your app, you can perform a full reload:

- **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Dev Menu**, accessed via <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS).
- **iOS**: Press <kbd>R</kbd> in iOS Simulator.

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [docs](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you're having issues getting the above steps to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
