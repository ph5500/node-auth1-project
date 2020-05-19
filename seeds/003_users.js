
exports.seed = function (knex) {

  const users = [
    {
      username: 'user1',
      password: 'password1',
      role: 1,
    },
    {
      username: 'user2',
      password: 'password2',
      role: 2,
    },
    {
      username: 'user3',
      password: 'password3',
      role: 1,
    },
    {
      username: 'user4',
      password: 'password4'
    }
  ];
  return knex('users').insert(users);

};