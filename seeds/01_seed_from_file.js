const data = require('../backups/studybook-dump-1651730903770.json')

// Deletes ALL existing items and repopulates from json file
exports.seed = function(knex, Promise) {
  const joinTables = [
    {
      table: `term_topic`,
      rawCommand: `DELETE FROM "term_topic"; ALTER SEQUENCE term_topic_id_seq RESTART WITH ${Math.max(...data.term_topic.map(term_topic => term_topic.id)) + 1};`,
      insertItems: data.term_topic
    },
    {
      table: `question_term`,
      rawCommand: `DELETE FROM "question_term"; ALTER SEQUENCE question_term_id_seq RESTART WITH ${Math.max(...data.question_term.map(question_term => question_term.id)) + 1};`,
      insertItems: data.question_term
    },
    {
      table: `question_topic`,
      rawCommand: `DELETE FROM "question_topic"; ALTER SEQUENCE question_topic_id_seq RESTART WITH ${Math.max(...data.question_topic.map(question_topic => question_topic.id)) + 1};`,
      insertItems: data.question_topic
    }
  ]
  const seedCommands = [
    {
      table: `book`,
      rawCommand: `DELETE FROM "book"; ALTER SEQUENCE book_id_seq RESTART WITH ${Math.max(...data.book.map(book => book.id)) + 1};`,
      insertItems: data.book,
    },
    {
      table: `term`,
      rawCommand: `DELETE FROM "term"; ALTER SEQUENCE term_id_seq RESTART WITH ${Math.max(...data.term.map(term => term.id)) + 1};`,
      insertItems: data.term,
    },
    {
      table: `topic`,
      rawCommand: `DELETE FROM "topic"; ALTER SEQUENCE category_id_seq RESTART WITH ${Math.max(...data.topic.map(topic => topic.id)) + 1};`,
      insertItems: data.topic,
    },
    {
      table: `question`,
      rawCommand: `DELETE FROM "question"; ALTER SEQUENCE question_id_seq RESTART WITH ${Math.max(...data.question.map(question => question.id)) + 1};`,
      insertItems: data.question,
    }
  ]

  const commandChain = [
    // delete old join data
    ...joinTables.map(command => {
      return () => knex.raw(command.rawCommand);
    }),
    // delete old data, then seed core data again
    ...seedCommands.map(command => {
      return () => knex.raw(command.rawCommand)
        .then(function () {
          return knex(command.table).insert(command.insertItems);
        });
    }),
    // seed join tables after core data is created
    ...joinTables.map(command => {
      return () => knex(command.table).insert(command.insertItems);
    }),
  ]

  console.log('Running seed from file...')
  return new Promise(async (resolve, reject) => {
    let nextCommand
    while (nextCommand = commandChain.shift()) {
      console.log('Running next command...')
      try {
        const success = await nextCommand()
        if (Array.isArray(success)) {
          console.log(success.map(obj => [obj.command, obj.rowCount]))
        }
        else {
          console.log([success.command, success.rowCount])
        }
      } catch (e) {
        console.log('ERR --', e.message)
        reject(`STOPPING due to error.`)
      }
    }
    resolve(`Ran all commands`)
  })
};
