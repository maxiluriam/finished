<script lang="ts">
  import save from "./save";

  let people: Array<any> = [
    { name: "max", points: 0 },
    { name: "nikola", points: 0 },
    { name: "werner", points: 0 },
  ];

  let newPerson: string = "";
</script>

<main>
  {#if people.length < 5}
    <div id="add">
      <input id="add" bind:value={newPerson} type="text" />
      <button
        on:click={() => {
          {
            people = [...people, { name: newPerson, points: 0, add: 0 }];
          }
          {
            save(people);
          }
        }}>add</button
      >
    </div>
  {/if}

  <div id="container">
    {#if people.length !== 0}
      {#each people as person, i}
        <div>
          <button
            on:click={() => {
              {
                person.points -= 5;
              }
              {
                save(people);
              }
            }}>-5</button
          >
          <button
            on:click={() => {
              {
                person.points -= 1;
              }
              {
                save(people);
              }
            }}>-1</button
          >

          <button
            on:click={() => {
              {
                person.points += 1;
              }
              {
                save(people);
              }
            }}>+1</button
          >
          <button
            on:click={() => {
              {
                person.points += 5;
              }
              {
                save(people);
              }
            }}>+5</button
          >

          <h1>{person.name}:{person.points}</h1>

          <button
            on:click={() => {
              {
                person.points = 0;
              }
              {
                save(people);
              }
            }}>reset</button
          >

          <button
            on:click={() => {
              {
                people.splice(i, 1);
              }
              {
                people = people;
              }
              {
                save(people);
              }
            }}>remove</button
          >
        </div>
      {/each}
    {/if}
  </div>
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  div {
    text-align: center;
    padding: 1em;

    margin: 0 auto;
  }

  #container {
    text-align: center;
    padding: 0em;
    max-width: 1100px;
    margin: 0 auto;

    display: flex;
    flex-direction: row;

    margin-top: 200px;
  }

  #add input {
    margin-top: 50px;
  }

  h1 {
    color: #ff3e00;
    text-transform: none;
    font-size: 4em;
    font-weight: 100;

    margin: 10px;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
