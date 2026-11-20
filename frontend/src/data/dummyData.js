// Static dummy data — later we will replace this with real API calls (Axios + Express).

const avatar = (n) => `https://i.pravatar.cc/150?img=${n}`;
// Post images from Unsplash (free photos)
const unsplash = {
  mountains: "1506905925346-21bda4d32df4",
  food: "1504674900247-0877df9cc836",
  laptop: "1498050108023-c5249f4df085",
  design: "1561070791-2526d30994b5",
  city: "1477959858617-67f85cf4f1df",
  beach: "1507525428034-b723cf961d3e",
  coffee: "1495474472287-4d71bcdd2085",
  forest: "1448375240586-882707db888b",
  sunset: "1470252649378-9c29740c9fa8",
  books: "1512820790803-83ca734da794",
  street: "1449824913935-59a10b8d2000",
  flowers: "1490750967868-88aa4486c946",
  desk: "1499951360447-b19be8fe80f5",
};
const photo = (name) => `https://images.unsplash.com/photo-${unsplash[name]}?w=700&h=700&fit=crop`;

export const currentUser = {
  id: 1,
  name: "Mentor",
  username: "mentor",
  avatar: "https://randomuser.me/api/portraits/women/51.jpg", // professional studio headshot, short hair
  bio: "Small steps every day lead to big results. 🚀",
  followers: 1280,
  following: 312,
};

export const users = [
  { id: 2, name: "Priya Verma", username: "priya.designs", avatar: avatar(32), bio: "UI/UX designer 🎨", followers: 2410, following: 180, online: true },
  { id: 3, name: "Rahul Mehta", username: "rahul.travels", avatar: avatar(58), bio: "Travel • Mountains • Photography 🏔️", followers: 5320, following: 410, online: false },
  { id: 4, name: "Sneha Iyer", username: "sneha.ai", avatar: avatar(26), bio: "Exploring AI one prompt at a time 🤖", followers: 890, following: 260, online: true },
  { id: 5, name: "Kabir Khan", username: "kabir.fit", avatar: avatar(60), bio: "Fitness coach 💪 | Stay consistent", followers: 3150, following: 95, online: false },
  { id: 6, name: "Ananya Das", username: "ananya.eats", avatar: avatar(5), bio: "Food blogger 🍜 | Kolkata", followers: 7600, following: 520, online: true },
  { id: 7, name: "Vikram Rao", username: "vikram.dev", avatar: avatar(8), bio: "Backend dev | Node.js ⚡", followers: 640, following: 300, online: false },
];

export const posts = [
  {
    id: 101, user: users[1], image: photo("mountains"), time: "2h",
    caption: "Woke up above the clouds ☁️ Totally worth the 5 AM trek! #travel #mountains",
    likes: 248,
    comments: [
      { id: 1, user: users[0], text: "This view is unreal 😍" },
      { id: 2, user: users[3], text: "Adding this to my bucket list!" },
    ],
  },
  {
    id: 102, user: users[4], image: photo("food"), time: "4h",
    caption: "Sunday special: homemade biryani 🍛 Recipe in comments!",
    likes: 512,
    comments: [{ id: 1, user: users[2], text: "Recipe please 🙏" }],
  },
  {
    id: 103, user: currentUser, image: photo("laptop"), time: "1d",
    caption: "Day 11 of building ConnectIQ — real-time chat is LIVE with Socket.IO ⚡ #MERN #buildinpublic",
    likes: 189,
    comments: [
      { id: 1, user: users[5], text: "Socket.IO is magic 🔥" },
      { id: 2, user: users[0], text: "Can't wait to try it!" },
    ],
  },
  {
    id: 104, user: users[0], image: photo("design"), time: "2d",
    caption: "New UI concept for a music app 🎧 Feedback welcome!",
    likes: 305,
    comments: [],
  },
];

// Extra images for profile / explore grids
export const gridImages = ["city", "beach", "coffee", "forest", "sunset", "books", "street", "flowers", "desk"].map(photo);

export const conversations = [
  {
    id: 1, user: users[0], unread: 2, time: "10:42 AM",
    messages: [
      { id: 1, from: "them", text: "Hey Mentor! Did you finish the chat feature? 👀", time: "10:30 AM" },
      { id: 2, from: "me", text: "Almost! Messages are working in real time now.", time: "10:32 AM" },
      { id: 3, from: "them", text: "Awesome! Are we still meeting tomorrow to plan the demo?", time: "10:40 AM" },
      { id: 4, from: "them", text: "Also, can you share the Figma link for the profile page?", time: "10:42 AM" },
    ],
  },
  {
    id: 2, user: users[3], unread: 0, time: "Yesterday",
    messages: [
      { id: 1, from: "them", text: "Have you tried the Groq API yet?", time: "6:10 PM" },
      { id: 2, from: "me", text: "Yes! It's super fast for caption generation 🚀", time: "6:12 PM" },
    ],
  },
  {
    id: 3, user: users[5], unread: 1, time: "Mon",
    messages: [{ id: 1, from: "them", text: "Your Biryani post went viral 😂", time: "9:00 PM" }],
  },
  {
    id: 4, user: users[2], unread: 0, time: "Sun",
    messages: [{ id: 1, from: "me", text: "Great trek pics bro!", time: "4:20 PM" }],
  },
];

// ---- Fake AI responses (later these will come from the Groq API) ----

export const aiCaptions = {
  Funny: [
    "I came, I saw, I took 47 photos of the same view 📸😂",
    "My bank account said no, my heart said GO ✈️",
    "Plot twist: the view was the main character 🎬",
  ],
  Casual: [
    "Good vibes and even better views ✨",
    "Just a little moment I didn't want to forget 💛",
    "Slow days, happy heart 🌿",
  ],
  Professional: [
    "Grateful for moments that inspire fresh perspectives.",
    "Taking time to recharge leads to better work. 🌄",
    "Every journey teaches something new about growth.",
  ],
};

export const aiReplies = {
  Friendly: ["Yes, tomorrow works! 😊", "Sure, sending the link now!", "Can't wait, see you then!"],
  Funny: ["Only if you bring snacks 🍕😂", "Figma link incoming at the speed of light ⚡", "Demo? I was born ready 😎"],
  Professional: ["Yes, let's meet tomorrow as planned.", "I'll share the Figma link shortly.", "Sounds good. I'll prepare the demo agenda."],
};

export const aiSummary = [
  "Priya asked about the progress of the chat feature — it now works in real time.",
  "You both plan to meet tomorrow to prepare the project demo.",
  "Priya needs the Figma link for the profile page.",
];
