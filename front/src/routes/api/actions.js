export async function toggleLock(id, currentState) {
    const action = currentState ? 'close' : 'open';
    try {
        const response = await fetch(`http://192.168.1.26:8000/doors/${id}/${action}`, {
            method: 'GET'
        });
        if (!response.ok) {
            throw new Error(`Erreur lors du changement de l'état de la serrure: ${response.state}`);
        }
        return !currentState; // Retourne l'état inversé si le changement a réussi
    } catch (error) {
        console.error("Erreur lors du changement de l'état de la serrure:", error);
        throw error;
    }
}
