const { MongoClient, ServerApiVersion } = require("mongodb");
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const { seedDatabase } = require("./seedDatabase.js");
const { seedDatabase } = require('./seedDatabase.js');

async function createEpisodeExercise(client) {
  /**
   * We forgot to add the last episode of season 9. It has this information:
   *
   * episode: S09E13
   * title: MOUNTAIN HIDE-AWAY
   * elements: ["CIRRUS", "CLOUDS", "CONIFER", "DECIDIOUS", "GRASS", "MOUNTAIN", "MOUNTAINS", "RIVER", "SNOWY_MOUNTAIN", "TREE", "TREES"]
   */

  // Write code that will add this to the collection!

  const insertedData = await client
    .db('databaseWeek3')
    .collection('bob_ross_episodes')
    .insertOne({
      episode: 'S09E13',
      title: 'MOUNTAIN HIDE-AWAY',
      elements: [
        'CIRRUS',
        'CLOUDS',
        'CONIFER',
        'DECIDIOUS',
        'GRASS',
        'MOUNTAIN',
        'MOUNTAINS',
        'RIVER',
        'SNOWY_MOUNTAIN',
        'TREE',
        'TREES',
      ],
    });

  console.log(
    `Created season 9 episode 13 and the document got the id ${"TODO: fill in variable here"}`
      `Created season 9 episode 13 and the document got the id ${insertedData.insertedId}`
  );
}

async function findEpisodesExercises(client) {
  /**
   * Complete the following exercises.
   * The comments indicate what to do and what the result should be!
   */

  // Find the title of episode 2 in season 2 [Should be: WINTER SUN]

  console.log(
    `The title of episode 2 in season 2 is ${"TODO: fill in variable here"}`
  );
  const episode2Title = await client
    .db('databaseWeek3')
    .collection('bob_ross_episodes')
    .findOne({ episode: 'S02E02' });

  console.log(`The title of episode 2 in season 2 is ${episode2Title.title}`);

  // Find the season and episode number of the episode called "BLACK RIVER" [Should be: S02E06]

  const seasonAndEpisodeNo = await client
    .db('databaseWeek3')
    .collection('bob_ross_episodes')
    .findOne({ title: 'BLACK RIVER' });

  console.log(
    `The season and episode number of the "BLACK RIVER" episode is ${"TODO: fill in variable here"}`
      `The season and episode number of the "BLACK RIVER" episode is ${seasonAndEpisodeNo.episode}`
  );

  // Find all of the episode titles where Bob Ross painted a CLIFF [Should be: NIGHT LIGHT, EVENING SEASCAPE, SURF'S UP, CLIFFSIDE, BY THE SEA, DEEP WILDERNESS HOME, CRIMSON TIDE, GRACEFUL WATERFALL]

  console.log(
    `The episodes that Bob Ross painted a CLIFF are ${"TODO: fill in variable here"}`
  );
  const titlesCliff = await client
    .db('databaseWeek3')
    .collection('bob_ross_episodes')
    .find({ elements: 'CLIFF' });

  // The episodes that Bob Ross painted a CLIFF are NIGHT LIGHT, EVENING SEASCAPE, SURF'S UP, CLIFFSIDE, BY THE SEA, DEEP WILDERNESS HOME, CRIMSON TIDE, GRACEFUL WATERFALL

  console.log(`The episodes that Bob Ross painted a CLIFF are`);

  for await (const title of titlesCliff) {
    console.log(title.title);
  }

  // Find all of the episode titles where Bob Ross painted a CLIFF and a LIGHTHOUSE [Should be: NIGHT LIGHT]

  const titleCliffAndLightHouse = await client
    .db('databaseWeek3')
    .collection('bob_ross_episodes')
    .find({ elements: 'CLIFF', elements: 'LIGHTHOUSE' });

  console.log(
    `The episodes that Bob Ross painted a CLIFF and a LIGHTHOUSE are ${"TODO: fill in variable here"}`
      `The episodes that Bob Ross painted a CLIFF and a LIGHTHOUSE are `
  );

  for await (const title of titleCliffAndLightHouse) {
    console.log(title.title);
  }
}

async function updateEpisodeExercises(client) {
async function updateEpisodeExercises(client) {
    // Episode 13 in season 30 should be called BLUE RIDGE FALLS, yet it is called BLUE RIDGE FALLERS now. Fix that
    const update1330 = await client
      .db('databaseWeek3')
      .collection('bob_ross_episodes')
      .updateOne({ episode: 'S30E13' }, { $set: { title: 'BLUE RIDGE FALLS' } });

    //    Ran a command to update episode 13 in season 30 and it updated 1 episodes

    console.log(
      `Ran a command to update episode 13 in season 30 and it updated ${"TODO: fill in variable here"} episodes`
        `Ran a command to update episode 13 in season 30 and it updated ${update1330.modifiedCount} episodes`
    );

    // Unfortunately we made a mistake in the arrays and the element type called 'BUSHES' should actually be 'BUSH' as sometimes only one bush was painted.
    // Update all of the documents in the collection that have `BUSHES` in the elements array to now have `BUSH`
    // It should update 120 episodes!

    const updateBushes = await client
      .db('databaseWeek3')
      .collection('bob_ross_episodes')
      .updateMany({ elements: 'BUSHES' }, { $set: { elements: 'BUSH' } });

    console.log(
      `Ran a command to update all the BUSHES to BUSH and it updated ${"TODO: fill in variable here"} episodes`
        `Ran a command to update all the BUSHES to BUSH and it updated ${updateBushes.modifiedCount} episodes`
    );
  }

async function deleteEpisodeExercise(client) {


    const delete1331 = await client
      .db('databaseWeek3')
      .collection('bob_ross_episodes')
      .deleteOne({
        episode: 'S31E14',
      });

    //Ran a command to delete episode and it deleted 1 episodes

    console.log(
      `Ran a command to delete episode and it deleted ${"TODO: fill in variable here"} episodes`
        `Ran a command to delete episode and it deleted ${delete1331.deletedCount} episodes`
    );
  }

    async function main() {
      if (process.env.MONGODB_URL == null) {
        throw Error(
          `You did not set up the environment variables correctly. Did you create a '.env' file and add a package to create it?`
        );
      }
      const client = new MongoClient(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverApi: ServerApiVersion.v1,
      });

      try {
        await client.connect();

        // Seed our database
        await seedDatabase(client);

        // CREATE
        await createEpisodeExercise(client);

        // READ
        await findEpisodesExercises(client);

        // UPDATE
        await updateEpisodeExercises(client);

        // DELETE
        await deleteEpisodeExercise(client);
        if (process.env.MONGODB_URL == null) {
          throw Error(
            `You did not set up the environment variables correctly. Did you create a '.env' file and add a package to create it?`
          );
        }
        const client = new MongoClient(process.env.MONGODB_URL);
        console.log(process.env.MONGODB_URL);
        try {
          await client.connect();

          // Seed our database
          await seedDatabase(client);

          // CREATE
          await createEpisodeExercise(client);

          // READ
          await findEpisodesExercises(client);

          // UPDATE
          await updateEpisodeExercises(client);

          // DELETE
          await deleteEpisodeExercise(client);
        } catch (err) {
          console.error(err);
        } finally {
          // Always close the connection at the end
          client.close();
        }
      } catch (err) {
        console.error(err);
      } finally {
        // Always close the connection at the end
        client.close();
      }
    }
  }
