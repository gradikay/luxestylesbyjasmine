# How to Change Your Business Hours

## Quick Start Guide

Your business hours are stored in a file called `hours.js`. This file is designed to be super easy to edit, even if you're not technical.

## Step-by-Step Instructions

### 1. Open the Hours File
- Open the `js` folder
- Look for the file named `hours.js`
- Click on it to open it

### 2. Find Your Day
You'll see a section that looks like this:
```
const businessHours = {
    MONDAY: {
        isOpen: true,
        openTime: "9:00 AM",
        closeTime: "6:00 PM"
    },
    
    TUESDAY: {
        isOpen: true,
        openTime: "9:00 AM", 
        closeTime: "6:00 PM"
    },
    // ... and so on for each day
};
```

### 3. Change Your Hours

#### To Change Opening Time:
- Find the day you want to change
- Look for `openTime: "9:00 AM"`
- Change the time between the quotes
- Examples:
  - `openTime: "8:00 AM"` (opens at 8 AM)
  - `openTime: "10:30 AM"` (opens at 10:30 AM)
  - `openTime: "12:00 PM"` (opens at noon)

#### To Change Closing Time:
- Find the day you want to change
- Look for `closeTime: "6:00 PM"`
- Change the time between the quotes
- Examples:
  - `closeTime: "5:00 PM"` (closes at 5 PM)
  - `closeTime: "8:30 PM"` (closes at 8:30 PM)
  - `closeTime: "7:00 PM"` (closes at 7 PM)

#### To Close on a Specific Day:
- Find the day you want to close
- Change `isOpen: true` to `isOpen: false`
- The opening and closing times don't matter when `isOpen: false`

## Time Format Rules

### ✅ CORRECT Examples:
- `"9:00 AM"`
- `"10:30 AM"`
- `"12:00 PM"` (noon)
- `"1:00 PM"`
- `"6:30 PM"`
- `"11:59 PM"`

### ❌ WRONG Examples:
- `"9 AM"` (missing :00)
- `"21:00"` (don't use 24-hour time)
- `"9:00am"` (AM/PM must be uppercase with space)
- `"9:00 A.M."` (no periods)

## Common Changes

### Example 1: Weekend Hours
```
SATURDAY: {
    isOpen: true,
    openTime: "10:00 AM",
    closeTime: "4:00 PM"
},

SUNDAY: {
    isOpen: false,  // Closed on Sundays
    openTime: "9:00 AM",
    closeTime: "5:00 PM"
}
```

### Example 2: Extended Thursday Hours
```
THURSDAY: {
    isOpen: true,
    openTime: "9:00 AM",
    closeTime: "9:00 PM"  // Open late on Thursdays
}
```

### Example 3: Closed on Mondays
```
MONDAY: {
    isOpen: false,  // Closed on Mondays
    openTime: "9:00 AM",
    closeTime: "5:00 PM"
}
```

## Adding Holiday Closures

Scroll down in the file to find this section:
```
const specialClosedDates = [
    "2025-12-25",  // Christmas Day
    "2025-01-01",  // New Year's Day  
    "2025-07-04",  // Independence Day
    "2025-11-28"   // Thanksgiving Day
    // Add your vacation dates here like: "2025-08-15"
];
```

### To Add a Holiday:
1. Add a comma after the last date
2. Add your new date in quotes
3. Use the format: "YYYY-MM-DD"
4. Add a comment to remember what it is

### Example - Adding Your Birthday as a Holiday:
```
const specialClosedDates = [
    "2025-12-25",  // Christmas Day
    "2025-01-01",  // New Year's Day  
    "2025-07-04",  // Independence Day
    "2025-11-28",  // Thanksgiving Day
    "2025-06-15"   // My Birthday - Closed
];
```

## Important Rules

### 1. Keep the Quotes
- Always put times in quotes like `"9:00 AM"`
- Never remove the quotes

### 2. Keep the Commas
- Each line ends with a comma except the last one
- Don't add extra commas

### 3. Don't Change These Parts:
- `const businessHours = {`
- `MONDAY:`, `TUESDAY:`, etc.
- `isOpen:`, `openTime:`, `closeTime:`
- The curly braces `{` and `}`

### 4. Only Change:
- The times inside quotes
- `true` to `false` (to close a day)
- `false` to `true` (to open a day)

## Testing Your Changes

After you make changes:
1. Save the file
2. Refresh your website
3. Check that the hours display correctly
4. If something looks wrong, double-check your formatting

## What Each Part Does

### `isOpen: true/false`
- `true` = salon is open that day
- `false` = salon is closed that day

### `openTime:`
- What time you unlock the doors and start taking customers

### `closeTime:`
- What time you stop taking new customers and lock up

### Special Dates
- Days when you're closed even though you'd normally be open
- Like holidays, vacations, or special events

## Need Help?

If you make a mistake and the website breaks:
1. Check that all your times have quotes around them
2. Make sure you didn't accidentally delete any commas or curly braces
3. Verify your times use the format "H:MM AM/PM"
4. Check that holiday dates use "YYYY-MM-DD" format

Remember: You can always undo your changes and try again!