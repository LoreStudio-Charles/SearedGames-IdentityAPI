### Await/Async Request Syntax
```
app.get('/async', async(req, res)
    => {
        let users;
        try {
            users = await User.findById(1);
        } catch (err) {
            console.log(err);
        }

        return res.json(users);
    }
);
```

### Deployment

#### Migrate and Seed Database
```
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```

#### Tear Down Database
```
npx sequelize-cli db:seed:undo:all
npx sequelize-cli db:migrate:undo:all
```

#### Start in development mode
```
npm start dev
```