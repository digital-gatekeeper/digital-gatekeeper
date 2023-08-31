<script>
    import { onMount } from 'svelte';
    import { getState } from './api/state.js';
    import { toggleLock } from './api/actions.js';

    let locked = null;
    let loadingError = false;
    let loadingAction = false;  // Ajouté ici
    let operationText = '';
    let isOperating = false;

    const serrureId = 1;

    onMount(async () => {
        try {
            const timeout = setTimeout(() => {
                loadingError = true;
            }, 6000);

            let state = await getState();
            locked = state === "opened" ? false : true;

            clearTimeout(timeout);
        } catch (error) {
            console.error("Erreur lors de la récupération de l'état de la serrure:", error);
        }
    });


    async function handleToggle() {
        isOperating = true;
        loadingAction = true;  // Ajouté ici
        operationText = locked ? "serrure en cours de fermeture..." : "serrure en cours d'ouverture...";

        try {
            locked = await toggleLock(serrureId, locked);
        } catch (error) {
            console.error("Erreur lors du basculement de l'état de la serrure:", error);
        } finally {
            loadingAction = false;  // Ajouté ici
            isOperating = false;
        }
    }
</script>

{#if locked === null}
    {#if loadingError}
        <p>Erreur : Le chargement a pris trop de temps. Veuillez réessayer.</p>
    {:else}
        <span class="loader"></span>
    {/if}
{:else}
    <p>La porte est <span class="lock-status">{locked ? 'déverrouillée' : 'verrouillée'}</span>.</p>
    <button on:click={handleToggle}  disabled={isOperating}>
        {locked ? '🔓' : '🔒'}
    </button>
{/if}

{#if isOperating}
    <p>{operationText}</p>
{/if}


<style>
    button {
        display: block;
        margin: 2rem auto;
        width: 200px;
        height: 200px;
        background-color: #007BFF;
        color: white;
        border: none;
        border-radius: 50%;
        box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
        cursor: pointer;
        font-size: 1.5rem;
        line-height: 60px;
        text-align: center;
        transition: background-color 0.3s ease, transform 0.2s ease;
    }

    button:hover {
        background-color: #0056b3;
    }

    button:active {
        background-color: #0056b3;
        transform: scale(0.95);
    }

    button[disabled] {
        opacity: 0.6;
        cursor: not-allowed;
    }

    button:active[disabled] {
        transform: none;
    }

    p {
        font-size: 20px;
        font-family: "Fira Code";
        color: black;
    }

    .lock-status {
        color: #007BFF;
        font-weight: bold;
    }

    .loader {
        color: #ffffff;
        font-size: 45px;
        text-indent: -9999em;
        overflow: hidden;
        width: 1em;
        height: 1em;
        border-radius: 50%;
        position: relative;
        transform: translateZ(0);
        animation: mltShdSpin 1.7s infinite ease, round 1.7s infinite ease;
    }

    @keyframes mltShdSpin {
        0% {
            box-shadow: 0 -0.83em 0 -0.4em,
            0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em,
            0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;
        }
        5%,
        95% {
            box-shadow: 0 -0.83em 0 -0.4em,
            0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em,
            0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;
        }
        10%,
        59% {
            box-shadow: 0 -0.83em 0 -0.4em,
            -0.087em -0.825em 0 -0.42em, -0.173em -0.812em 0 -0.44em,
            -0.256em -0.789em 0 -0.46em, -0.297em -0.775em 0 -0.477em;
        }
        20% {
            box-shadow: 0 -0.83em 0 -0.4em, -0.338em -0.758em 0 -0.42em,
            -0.555em -0.617em 0 -0.44em, -0.671em -0.488em 0 -0.46em,
            -0.749em -0.34em 0 -0.477em;
        }
        38% {
            box-shadow: 0 -0.83em 0 -0.4em, -0.377em -0.74em 0 -0.42em,
            -0.645em -0.522em 0 -0.44em, -0.775em -0.297em 0 -0.46em,
            -0.82em -0.09em 0 -0.477em;
        }
        100% {
            box-shadow: 0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em,
            0 -0.83em 0 -0.44em, 0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;
        }
    }

    @keyframes round {
        0% { transform: rotate(0deg) }
        100% { transform: rotate(360deg) }
    }



</style>

<!-- Reste du code svelte... -->
