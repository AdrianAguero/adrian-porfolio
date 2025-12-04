async function runQA() {
    console.log('Starting QA Test for Chatbot...');
    const startTime = Date.now();

    try {
        const response = await fetch('http://localhost:3000/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                messages: [{ role: 'user', content: 'Hola, ¿quién eres?' }]
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let fullContent = '';
        let chunkCount = 0;

        console.log('Stream connection established. Receiving data...');

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value, { stream: true });
            fullContent += chunk;
            chunkCount++;

            // Simulate client-side processing load
            // process.stdout.write('.'); 
        }

        const duration = Date.now() - startTime;
        console.log('\n\n--- QA Results ---');
        console.log(`Status: SUCCESS`);
        console.log(`Total Duration: ${duration}ms`);
        console.log(`Chunks Received: ${chunkCount}`);
        console.log(`Content Length: ${fullContent.length} chars`);
        console.log(`Final Content Preview: "${fullContent.substring(0, 50)}..."`);

        if (fullContent.length < 10) {
            console.error('FAIL: Content too short, likely cut off.');
        } else {
            console.log('PASS: Content length looks normal.');
        }

    } catch (e) {
        console.error('\n--- QA FAILED ---');
        console.error(e);
    }
}

runQA();
