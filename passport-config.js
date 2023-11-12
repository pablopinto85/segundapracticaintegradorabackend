const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GitHubStrategy = require('passport-github').Strategy;
const bcrypt = require('bcrypt');

const User = require('./models/user.model'); // Reemplaza esto con la ruta correcta a tu modelo de usuario

passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return done(null, false, { message: 'Usuario no encontrado' });
        }

        if (await bcrypt.compare(password, user.password)) {
            return done(null, user);
        } else {
            return done(null, false, { message: 'Contraseña incorrecta' });
        }
    } catch (error) {
        return done(error);
    }
}));

passport.use(new GitHubStrategy({
    clientID: 'Iv1.edfa107f63171b66',
    clientSecret: 'dd0d073d606f562db9bd06b8a400dc5f8315edbf',
    callbackURL: 'http://localhost:8080/api/sessions/githubcallback'
}, async (accessToken, refreshToken, profile, done) => {
    try {
        // Verificar si el usuario ya existe en tu base de datos
        let user = await User.findOne({ githubId: profile.id });
        if (!user) {
            // Si no existe, crea un nuevo usuario
            user = new User({ githubId: profile.id, username: profile.username });
            await user.save();
        }
        return done(null, user);
    } catch (error) {
        return done(error);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error);
    }
});
