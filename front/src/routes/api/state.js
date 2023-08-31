export async function getState() {
    try {
        const response = await fetch(`http://192.168.1.26:8000/doors/1/status`);
        if (!response.ok) {
            throw new Error(`Erreur lors de la récupération de l'état de la serrure: ${response.statusText}`);
        }
        const data = await response.json();

        // Convertissez l'état en une valeur boolean : true pour "closed" et false pour "opened"
        return data.state === "closed";
    } catch (error) {
        console.error("Erreur lors de la récupération de l'état de la serrure:", error);
        throw error;
    }
}
