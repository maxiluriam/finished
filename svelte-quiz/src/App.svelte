<script lang="ts">


let objects:Array<any> =[{question:"When did Apollo 11 land on the moon?",awnser:"1969",alternatives:["1970","1967","1969","1979"]},
						 {question:"Where would you be if you were standing on the Spanish Steps?",awnser:"Rome",alternatives:["Rome","Spain","France","America"]},
						 {question:"Who famously crossed the Alps with elephants on the way to a war the Romans?",awnser:"Hannibal",alternatives:["Caesar","Hannibal","Napoleon"]},
					     {question:"What is a group of pandas known as?",awnser:"An embarrassment",alternatives:["An array","A nest","A cult","An embarrassment","A conspiracy"]}]

let i:number = 0		
let score:number = 0


	let submit = function(e:any) {	
	if(e.path[0].id === objects[i].awnser){i++}
	else{score++}
	}
	</script>
	
	<main>
		<div id="container">
			{#if objects.length !== i }

				<div><h1>{objects[i].question}</h1></div>
				<div>{#each objects[i].alternatives as item}
					<button id={item} on:click={submit}>{item}</button>	 
				{/each}</div>
			
			{:else}
			
				<div><h1>You did it you cleared all questions with {score} wrong</h1></div>
				<form action=""><button type="submit">Restart</button></form>

			{/if}
		</div>
	</main>
	
	<style>
		main {
			text-align: center;
			padding: 0px;
			max-width: 240px;
			margin: 0 auto;

			height: 1080px;

		}



	
	
		@media (min-width: 640px) {
			main {
				max-width: none;
			}
		}
	</style>