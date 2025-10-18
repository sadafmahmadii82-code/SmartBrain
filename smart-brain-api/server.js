const express = require ('express');
const bodyParser = require ('body-parser');
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors');
const knex = require('knex');


const db = knex({
	client:'pg',
	connection:{
		host :process.env.DB_HOST,
		port :parseInt (process.env.DB_PORT) ,
		user :process.env.DB_USER,
		password :process.env.DB_PASSWORD,
		database :process.env.DB_NAME
	}
});


const app = express();
app.use(bodyParser.json());
app.use(cors());


app.get('/' , (req,res)=>{
	res.json(database.users);
})

app.post('/signin' , (req,res)=>{
	db.select('email','hash').from('login')
	.where('email' , '=' , req.body.email)
	.then(data => {
		const isValid = bcrypt.compareSync(req.body.password , data[0].hash);
		if(isValid) {
			return db.select('*').from('users')
			.where('email' , '=' , req.body.email)
			.then(user => {
				res.json(user[0]);
			})
			.catch(err => res.status(404).json('unable to find user'))
		}else {
			res.status(400).json('wrong password or email')
		}
	})
	.catch(err => res.status(404).json('an err happend'))
})

app.post('/register' , (req,res)=>{
	const {email,name,password} = req.body;
	const hash = bcrypt.hashSync(password);
	
	app.post('/register', async (req, res) => {
  const { email, name, password } = req.body;
  const hash = bcrypt.hashSync(password);

  try {
    await db('login').insert({ hash, email });
    const user = await db('users')
      .insert({ email, name, joined: new Date(), entries: 0 })
      .returning('*');

    res.json(user[0]);
  } catch (err) {
    console.error('REGISTER ERROR:', err.message);
    res.status(400).json('unable to join');
  }
});

app.get('/profile/:id', (req,res)=>{
	const {id} = req.params;
	db.select('*').from('users').where({
		id:id
	})
	.then(user => {
		if(user.length){
			res.json(user[0]);
		} else {
			res.status(404).json('not found')
		}
		
	})
	.catch(err => res.status(404).json('an err happend'))
})

app.put('/image', (req,res)=> {
	const {id} = req.body;
	db('users')
	.where('id' , '=' , id)
	.increment('entries' , 1)
	.returning('entries')
	.then(entries => {
		res.json((entries[0].entries));
	})
})


const PORT = parseInt(process.env.PORT) || 3000;
app.listen(PORT , ()=>{
	console.log('app is running');
})