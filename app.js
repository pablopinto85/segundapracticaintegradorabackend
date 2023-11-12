
const express = require("express");
const path = require("path");
const handlebars = require('express-handlebars');
const engine = handlebars.engine;
const GitHubStrategy = require('passport-github').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const User = require("./models/user.model.js");
const initializePassport = require("./passport-config.js");
const cartsRouter = require("./routes/carts.js");
const messagesRouter = require("./routes/messages.js");
const productsRouter = require("./routes/product.js");
const uploadRouter = require("./routes/upload.js").router; // Asumiendo que hay un objeto 'router' exportado
const sessionsRouter = require("./routes/registro.js");
const MongoStore = require('connect-mongo');
const ensureAuthenticated = require('./middleware/ensureAuthenticated');

const app = express();
const port = 8080;



app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
handlebars.create({ defaultLayout: 'main' });
app.engine('handlebars', handlebars.engine({
  layoutsDir: __dirname + '/views/layouts',
}));
app.set('view engine', 'handlebars');
// Define usersRouter antes de usarlo
const usersRouter = require('./routes/users');
// Importa tus rutas
const perfilRoutes = require('./routes/perfil');

mongoose.connect("mongodb+srv://pablopinto1985:pablo1985@ecommerce.kyhfmlv.mongodb.net/?retryWrites=true&w=majority")
    .then(() => console.log("Conectado a la base de datos exitosamente"))
    .catch(error => console.error("Error al conectarse a la base de datos: " + error));

app.use(session({
  secret: '12345678',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({ 
    mongoUrl: 'mongodb+srv://pablopinto1985:pablo1985@ecommerce.kyhfmlv.mongodb.net/?retryWrites=true&w=majority',
    collectionName: 'sessions'
    
  }),
}));

passport.use(new GitHubStrategy({
  clientID: 'Iv1.edfa107f63171b66',
  clientSecret: 'dd0d073d606f562db9bd06b8a400dc5f8315edbf',
  callbackURL: 'http://localhost:8080/api/sessions/githubcallback'
},
async (accessToken, refreshToken, profile, done) => {
  
  const existingUser = await UserModel.findOne({ githubId: profile.id });

  if (existingUser) {
      return done(null, existingUser);
  }

 
  const newUser = new UserModel({
      githubId: profile.id,
      username: profile.username 
  });
  await newUser.save();

  return done(null, newUser);
}));


app.use('/perfil', ensureAuthenticated, perfilRoutes);
app.use('/auth', require('./routes/auth'));

// Ruta de registro
app.get("/register", (req, res) => {
  res.render("register", {});
});
app.post("/register", (req, res) => {
  
});

// Ruta de inicio de sesión
app.get("/login", (req, res) => {
  res.render("login", {});
});
app.post("/login", (req, res) => {
  
});

// Ruta de cierre de sesión
app.get("/logout", (req, res) => {
  
});

app.get('/auth/github', passport.authenticate('github'));
app.get('/auth/github/callback', passport.authenticate('github', {
    successRedirect: '/welcome',
    failureRedirect: '/login', 
    failureFlash: true 
}));

app.get('/api/sessions/githubcallback', passport.authenticate('github', {
  successRedirect: '/welcome', 
  failureRedirect: '/login', 
  failureFlash: true 
}));

app.get('/welcome', (req, res) => {
  if (req.isAuthenticated()) {
      const user = req.user;
      const message = 'Bienvenido, ' + user.username;
      return res.render('welcome', { message: message });
  }
  return res.redirect('/login'); 
});

// Usa usersRouter después de definirlo
app.use('/users', usersRouter);

app.use("/public", express.static(path.join(__dirname, "public")));
app.use("/api/carts", cartsRouter);
app.use("/api/msg", messagesRouter);
app.use("/api/prod", productsRouter);
app.use("/", uploadRouter);

app.get("/chat", async (req, res) => {
    res.render("chat", {
        title: "Chat con Mongoose",
    });
});

app.get("/multer", async (req, res) => {
    res.render("upload", {
        title: "Multer",
    });
});

app.use("/uploadRouter", uploadRouter);

app.listen(port, () => console.log(`Servidor conectado y escuchando en puerto ${port}`));


