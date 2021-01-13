# OTPphone-app

Our React-Native coding challenge is a simple "Mobile Phone Authentication". Users should be able to authenticate using their mobile number and otp code (6 characters).

```en
Important: Please make sure you use ReactNative and ReactNavigation. Codes should be written in Typescript.
```

## Suggested design
![Design](/otpphone-workflow.png)

## Main Features of the app

### 1) Input user mobile number

In this challenge scope, it is **not required** to let user select country code. User just need to input his mobile number **without** country code.

```en
Expect:

- Highlight bottom border when focus.
- Disable button on blank input.
- Continue button will be sticked to bottom screen and above keyboard.
```

### 2) Tap `Continue`

Users should also be able to input their OTP code (A1B2C3). Timeout 30s before enable `Resend` button.
Tap `back` on top left to go back to last screen without clearing the mobile number input.
Tap `Change number` to go back to last screen and clear the mobile number input.

```en
Expect:

- Focus next code block on inputting. On the 6th block, auto submit. Coundown 2s then navigate to a blank Home screen.
- Highlight bottom border each block when focus.
- Countdown 30s before enable the Resend button. After tap Resend, begin countdown again.
- Actions buttons will be sticked to bottom screen and above keyboard.
```
