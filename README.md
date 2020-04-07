# SEI-Project-2

# Travel Blog

![Imgur](https://i.imgur.com/dQuMIoA.jpg)

Pair programming: Brian Krabec and Brian Wilson

## Wireframes 

### Home

Landing page for the travel blog.

![Imgur](https://i.imgur.com/X5XPDsK.jpg)

### Photos/Blog

Main section where "travelers" can blog/submit photos and interact.

![Imgur](https://i.imgur.com/wBCSUtg.jpg)

## Blog - Show

![Imgur](https://i.imgur.com/bx80ks4.jpg)

## Add New

![Imgur](https://i.imgur.com/i1K6VAY.jpg)

## Edit and Update

![Imgur](https://i.imgur.com/0lv9BRU.jpg)

### User(Traveler) Information

Traveler show page where all information about the user can be found.

![Imgur](https://i.imgur.com/ZFkftMq.jpg)

## Models

```const travelerSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: String,
  lastName: String,
  dateOfBirth: Date,
  hometown: String,
  email: String,
  profilePic: String
})
const postSchema = new mongoose.Schema({
  city: String,
  country: String,
  date: Date,
  postDescription: String,
  postPicture: String,
  traveler: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Traveler',
    required: true 
  },
  comments: [Comment.schema]
})
const commentSchema = new mongoose.Schema({
  text: String,
  date: {
    type: Date,
    default: Date.now
  },
  traveler: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Traveler'
  }
})
```

## User Story

- You can navigate via links.
- You can create an account, log in, and log out.
- You can browse the landing page and blog page while logged out, but cannot interact with any blog page content.
- Once logged in, you can submit content and interact with other user submissions. 
- You can edit and delete your own posts.
- Traveler can view their personal information.

## Stretch Goals

- Proper layout and CSS.
- Ability to "like"?
- Traveler achievements.
- Interactive UI.
