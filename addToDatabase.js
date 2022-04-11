const moment = require('moment');
const Post = require('./models/postModel');
const Comment = require('./models/commentModel');
const User = require('./models/userModel');
const axios = require('axios');

const postIDs = [
  '6253824b4f7d2dcc4ca71ba9',
  '625384fac15a4b0871afa7f5',
  '62538545601bb8b678b58805',
  '62538545601bb8b678b58807',
  '62538545601bb8b678b5880b',
  '62538545601bb8b678b5880d',
  '62538545601bb8b678b58809',
  '62538545601bb8b678b58811',
  '62538545601bb8b678b58815',
  '62538545601bb8b678b58813',
  '62538545601bb8b678b5880f',
  '62538545601bb8b678b58819',
  '62538545601bb8b678b5881b',
  '62538545601bb8b678b5881d',
  '62538545601bb8b678b5881f',
  '62538545601bb8b678b58817',
  '62538545601bb8b678b58823',
  '62538545601bb8b678b58825',
  '62538545601bb8b678b58827',
  '62538545601bb8b678b58829',
  '62538545601bb8b678b5882b',
  '62538545601bb8b678b58821',
  '62538545601bb8b678b5882f',
  '62538545601bb8b678b58831',
  '62538546601bb8b678b58833',
  '62538546601bb8b678b58835',
  '62538546601bb8b678b58837',
  '62538546601bb8b678b58839',
  '62538545601bb8b678b5882d',
  '62538546601bb8b678b5883d',
  '62538546601bb8b678b5883f',
  '62538546601bb8b678b58841',
  '62538546601bb8b678b58843',
  '62538546601bb8b678b58849',
  '62538546601bb8b678b58847',
  '62538546601bb8b678b58845',
  '62538546601bb8b678b5883b',
  '62538546601bb8b678b5884d',
  '62538546601bb8b678b5884f',
  '62538546601bb8b678b58851',
  '62538546601bb8b678b58853',
  '62538546601bb8b678b58859',
  '62538546601bb8b678b58855',
  '62538546601bb8b678b58857',
  '62538546601bb8b678b5885b',
  '62538546601bb8b678b5884b',
  '62538546601bb8b678b5885f',
  '62538546601bb8b678b58861',
  '62538546601bb8b678b58863',
  '62538546601bb8b678b58865',
  '62538546601bb8b678b58867',
  '62538546601bb8b678b5885d',
  '625398df7778387e873d52eb',
  '625398df7778387e873d52ed',
  '625398df7778387e873d52f1',
  '625398df7778387e873d52f3',
  '625398df7778387e873d52ef',
  '625398df7778387e873d52f7',
  '625398df7778387e873d52f9',
  '625398df7778387e873d52fb',
  '625398df7778387e873d52f5',
  '625398df7778387e873d52ff',
  '625398df7778387e873d5303',
  '625398df7778387e873d5301',
  '625398df7778387e873d5305',
  '625398df7778387e873d52fd',
  '625398df7778387e873d5309',
  '625398df7778387e873d530b',
  '625398df7778387e873d530d',
  '625398df7778387e873d530f',
  '625398df7778387e873d5311',
  '625398df7778387e873d5307',
  '625398df7778387e873d5315',
  '625398df7778387e873d5317',
  '625398df7778387e873d5319',
  '625398df7778387e873d531b',
  '625398df7778387e873d531d',
  '625398df7778387e873d531f',
  '625398df7778387e873d5313',
  '625398df7778387e873d5323',
  '625398df7778387e873d5325',
  '625398df7778387e873d5327',
  '625398df7778387e873d5329',
  '625398df7778387e873d532b',
  '625398df7778387e873d532f',
  '625398df7778387e873d532d',
  '625398df7778387e873d5321',
  '625398df7778387e873d5333',
  '625398df7778387e873d5335',
  '625398df7778387e873d5337',
  '625398df7778387e873d5339',
  '625398df7778387e873d533b',
  '625398df7778387e873d533d',
  '625398df7778387e873d5341',
  '625398df7778387e873d533f',
  '625398df7778387e873d5331',
  '625398df7778387e873d5345',
  '625398df7778387e873d5343',
  '625398df7778387e873d5347',
  '625398df7778387e873d5349',
  '625398df7778387e873d534d',
  '625398df7778387e873d534b',
];

const mockUsers = [
  'sugarsnuffle',
  'vineail',
  'brawnymute',
  'dodgeballwidely',
  'feistyexhibition',
  'flaxseedcomet',
  'lawonerous',
  'strongbegan',
  'erstmystery',
  'bulletgrounded',
  'ailservice',
  'relybeans',
  'centerden',
  'trialyourself',
  'claimconclude',
  'readmainly',
  'decreasingslacks',
  'inbornconspiracy',
  'draconianimportant',
  'pageantryelytra',
  'truthfuzzy',
  'variouscuddly',
  'undergoevening',
  'cottonpurpur',
  'canceldeparture',
  'excellentsignal',
  'poursmirk',
  'panzebra',
  'bloathoop',
  'fatherlethargic',
  'weepingmilky',
  'garboardabstracted',
  'doofuscollected',
  'irritatedinning',
  'comeclove',
  'wageflint',
  'cellwimp',
  'stripedrent',
  'poopspring',
  'enchiladafaulty',
  'onionscoffle',
  'querulousregional',
  'treblewander',
  'unlockpatsy',
  'divorcesunbonnet',
  'worseimpartial',
  'barksecond',
  'rejectkind',
  'reliablelard',
];

const mockCommentList = [
  'Lorem ipsum dolor sit amet.',
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, ratione.',
  'Lorem, ipsum dolor.',
  'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quia odio modi nisi facilis eligendi nobis!',
  'Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
  'Lorem ipsum dolor sit.',
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, aliquam nesciunt.',
];

const createRandomAuthor = () => {
  return mockUsers[Math.floor(Math.random() * mockUsers.length)];
};

const createRandomComments = (postID) => {
  const numRandomComments = Math.floor(Math.random() * 100);
  const randomComments = [];

  for (let i = 0; i < numRandomComments; i++) {
    //   Comment consists of a text body and a User author
    const randomBody =
      mockCommentList[Math.floor(Math.random() * mockCommentList.length)];
    const randomUser = createRandomAuthor();
    randomComments.push({ body: randomBody, author: randomUser });
  }

  return randomComments;
};

const createRandomCreationDate = () => {
  const year = 2022; // Keep it simple!
  const randomMonth = Math.floor(Math.random() * 4) + 1;
  const randomDay = Math.floor(Math.random() * 9) + 1;

  const randomDateString = `${year}${('0' + randomMonth).slice(-2)}${(
    '0' + randomDay
  ).slice(-2)}`;

  return randomDateString;
};

const createRandomLikes = () => {
  const numRandomLikes = Math.floor(Math.random() * 20);
  const usersWhoLiked = [];

  for (let i = 0; i < numRandomLikes; i++) {
    usersWhoLiked.push(createRandomAuthor());
  }
};

const createRandomDislikes = () => {
  const numRandomDislikes = Math.floor(Math.random() * 20);
  const usersWhoDisliked = [];

  for (let i = 0; i < numRandomDislikes; i++) {
    usersWhoDisliked.push(createRandomAuthor());
  }
};

// Here we will just have some functions to help us quickly fill or delete parts of our database
async function insertMockPost() {
  // Post needs an author, title, body, list of comments, list of likes/dislikes
  //   const newPost = new Post({
  //     author: createRandomAuthor(),
  //     title: 'This is the title of a Post',
  //     body: 'This is the body of a Post',
  //     // comments: createRandomComments(),
  //     // comments: [],
  //     // likes: createRandomLikes(),
  //     // dislikes: createRandomDislikes(),
  //   });

  axios.post(`http://localhost:5000/api/posts`, {
    author: createRandomAuthor(),
    title: 'This is the title of a Post',
    body: 'This is the body of a Post',
  });
}

function insertMockComment(postID) {
  // Comment needs an author, body, reference Post
  axios.post(`http://localhost:5000/api/posts/${postID}`, {
    author: createRandomAuthor(),
    title: 'This is the title of a Post',
    body: 'This is the body of a Post',
  });
}

function insertMockUser() {}

function getAllPostIDs() {}

for (let i = 0; i < 50; i++) {
  insertMockPost();
}
