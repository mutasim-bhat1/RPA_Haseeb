// Demo Flow Controller
class OrderProcessingDemo {
    constructor() {
        this.currentStep = 0;
        this.isRunning = false;
        this.totalDuration = 270000; // 4.5 minutes total (270 seconds)
        this.typewriterSpeed = 50; // milliseconds per character
        this.currentTypewriterTimeout = null;
        this.steps = [
            {
                id: 'step1',
                duration: 45000, // 45 seconds
                status: '📧 Email Arrives',
                completedStatus: '✅ Email Processed',
                progressText: 'Email received and queued for processing',
                statusText: 'Processing',
                streamingTexts: [
                    'New email detected in inbox...',
                    'Scanning for purchase order attachments...',
                    'PDF attachment found: "PO-GM-2025-0123.pdf"',
                    'Email classified as: Purchase Order Request',
                    'Sender verified: procurement@globalmanufacturing.com',
                    'Email priority: High (Business Critical)',
                    'Attachment size: 2.3 MB - Processing initiated...',
                    'Email successfully queued for AI analysis'
                ],
                subSteps: [
                    { text: 'Email detection', duration: 5000 },
                    { text: 'Attachment scanning', duration: 8000 },
                    { text: 'Sender verification', duration: 12000 },
                    { text: 'Priority classification', duration: 10000 },
                    { text: 'Queue preparation', duration: 10000 }
                ]
            },
            {
                id: 'step2',
                duration: 90000, // 90 seconds
                status: '🤖 AI Analyzes Email',
                completedStatus: '✅ Analysis Complete',
                progressText: 'AI performing intelligent document classification and content analysis',
                statusText: 'Analyzing',
                streamingTexts: [
                    'Initializing AI document analysis engine...',
                    'Loading advanced OCR and NLP models...',
                    'Scanning document structure and layout...',
                    'Detecting tables, headers, and data fields...',
                    'Identifying purchase order format: Standard B2B Template',
                    'Extracting text with 99.7% accuracy confidence...',
                    'Analyzing business context and intent...',
                    'Cross-referencing with vendor database...',
                    'Detecting line items and pricing structures...',
                    'Validating document authenticity markers...',
                    'Classification complete: Purchase Order - High Confidence'
                ],
                subSteps: [
                    { text: 'AI model initialization', duration: 15000 },
                    { text: 'Document structure analysis', duration: 20000 },
                    { text: 'OCR text extraction', duration: 25000 },
                    { text: 'Content classification', duration: 20000 },
                    { text: 'Business context analysis', duration: 10000 }
                ]
            },
            {
                id: 'step3',
                duration: 75000, // 75 seconds
                status: '📄 AI Extracts Order Data',
                completedStatus: '✅ Data Extracted',
                progressText: 'AI reading PDF and extracting structured order details',
                statusText: 'Extracting',
                streamingTexts: [
                    'Beginning intelligent data extraction process...',
                    'Mapping document fields to order schema...',
                    'Extracting customer information: Global Manufacturing Corp.',
                    'Purchase Order #: PO-GM-2025-0123',
                    'Order Date: January 15, 2025',
                    'Delivery Address: 1247 Industrial Blvd, Detroit, MI',
                    'Processing line items (5 products detected)...',
                    'Item 1: Steel Brackets (Qty: 500) - $12.50 each',
                    'Item 2: Mounting Hardware Kit (Qty: 100) - $8.75 each',
                    'Item 3: Industrial Bolts M12x50 (Qty: 1000) - $0.85 each',
                    'Item 4: Washers Stainless Steel (Qty: 2000) - $0.15 each',
                    'Item 5: Assembly Instructions (Qty: 1) - $25.00 each',
                    'Calculating totals: Subtotal $7,625.00',
                    'Tax calculation: $610.00 (8% MI sales tax)',
                    'Total Order Value: $8,235.00',
                    'Data extraction completed with 100% field coverage'
                ],
                subSteps: [
                    { text: 'Field mapping initialization', duration: 10000 },
                    { text: 'Customer data extraction', duration: 15000 },
                    { text: 'Line item processing', duration: 30000 },
                    { text: 'Pricing calculation', duration: 15000 },
                    { text: 'Data validation', duration: 5000 }
                ]
            },
            {
                id: 'step4',
                duration: 45000, // 45 seconds
                status: '🔍 AI Validates Everything',
                completedStatus: '✅ Validation Passed',
                progressText: 'Smart validation of pricing, inventory, and business rules',
                statusText: 'Validating',
                streamingTexts: [
                    'Initiating comprehensive validation protocols...',
                    'Checking inventory availability across 3 warehouses...',
                    '✅ Steel Brackets: 2,847 units available (500 needed)',
                    '✅ Mounting Hardware: 456 kits available (100 needed)',
                    '✅ Industrial Bolts: 15,230 units available (1000 needed)',
                    '✅ Washers: 50,000+ units available (2000 needed)',
                    '✅ Assembly Instructions: Digital delivery available',
                    'Validating pricing against current rate cards...',
                    '✅ All prices within approved ranges (±2% tolerance)',
                    'Checking customer credit status: Approved ($50K limit)',
                    'Verifying delivery address and shipping zones...',
                    '✅ Standard delivery zone - 3-5 business days',
                    'Running business rule compliance checks...',
                    '✅ All validation checks passed successfully'
                ],
                subSteps: [
                    { text: 'Inventory verification', duration: 20000 },
                    { text: 'Pricing validation', duration: 10000 },
                    { text: 'Credit check', duration: 8000 },
                    { text: 'Business rules compliance', duration: 7000 }
                ]
            },
            {
                id: 'step5',
                duration: 15000, // 15 seconds
                status: '✅ Order Created & Customer Notified',
                completedStatus: '✅ Process Complete',
                progressText: 'Order created successfully and customer notification sent',
                statusText: 'Completing',
                streamingTexts: [
                    'Generating order confirmation: ORD-2025-0891...',
                    'Creating shipment schedule and tracking numbers...',
                    'Updating inventory reservations across warehouses...',
                    'Sending confirmation email to customer...',
                    'Notifying fulfillment team for order processing...',
                    'Order successfully created and all parties notified!',
                    '🎉 Total processing time: 4.5 minutes vs 2+ hours manual'
                ],
                subSteps: [
                    { text: 'Order generation', duration: 5000 },
                    { text: 'Inventory updates', duration: 4000 },
                    { text: 'Customer notification', duration: 3000 },
                    { text: 'Team alerts', duration: 3000 }
                ]
            }
        ];

        this.progressBar = null;
        this.progressStatus = null;
        this.progressTime = null;
        this.orderCounter = null;

        this.init();
    }

    init() {
        // Get DOM elements
        this.startBtn = document.getElementById('startDemo');
        this.resetBtn = document.getElementById('resetDemo');
        this.resultsSection = document.getElementById('results');
        this.progressFill = document.getElementById('progressFill');
        this.progressStatus = document.getElementById('progressStatus');
        this.progressTime = document.getElementById('progressTime');
        this.orderCounter = document.getElementById('orderCounter');

        // Bind event listeners
        this.startBtn.addEventListener('click', () => this.startDemo());
        this.resetBtn.addEventListener('click', () => this.resetDemo());

        // Initialize demo state
        this.resetDemo();

        // Start order counter animation
        this.animateOrderCounter();
    }

    animateOrderCounter() {
        // Randomly increment the order counter to simulate live processing
        setInterval(() => {
            if (this.orderCounter) {
                const currentValue = parseInt(this.orderCounter.textContent.replace(/,/g, ''));
                const newValue = currentValue + Math.floor(Math.random() * 3) + 1;
                this.orderCounter.textContent = newValue.toLocaleString();

                // Add a brief highlight effect
                this.orderCounter.classList.add('counter-highlight');
                setTimeout(() => {
                    this.orderCounter.classList.remove('counter-highlight');
                }, 500);
            }
        }, 5000);
    }

    startDemo() {
        if (this.isRunning) return;

        this.isRunning = true;
        this.startBtn.disabled = true;
        this.startBtn.querySelector('.btn-text').textContent = 'Processing...';
        this.startBtn.querySelector('.btn-icon').textContent = '⏳';

        // Hide results
        this.resultsSection.classList.remove('show');

        // Reset progress bar
        this.progressFill.style.width = '0%';
        this.progressStatus.textContent = 'Starting AI-powered order processing...';
        this.progressTime.textContent = 'Total time: 0 / 270 seconds (4.5 minutes)';

        // Clear any existing streaming text
        this.clearAllStreamingText();

        // Start progress bar animation
        this.startProgressBar();

        // Start processing steps
        this.processStep(0);
    }

    clearAllStreamingText() {
        // Clear any existing typewriter timeouts
        if (this.currentTypewriterTimeout) {
            clearTimeout(this.currentTypewriterTimeout);
        }

        // Clear streaming text containers
        this.steps.forEach(step => {
            const stepElement = document.getElementById(step.id);
            const streamingContainer = stepElement.querySelector('.streaming-text-container');
            if (streamingContainer) {
                streamingContainer.innerHTML = '';
                streamingContainer.style.display = 'none';
            }
        });
    }

    typewriterEffect(element, text, callback = null, speed = null) {
        const typeSpeed = speed || this.typewriterSpeed;
        let i = 0;
        element.innerHTML = '';
        element.style.display = 'block';

        const typeChar = () => {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                this.currentTypewriterTimeout = setTimeout(typeChar, typeSpeed);
            } else if (callback) {
                setTimeout(callback, 500); // Brief pause before callback
            }
        };

        typeChar();
    }

    displayStreamingTexts(stepIndex, callback) {
        const step = this.steps[stepIndex];
        const stepElement = document.getElementById(step.id);

        // Create or get streaming text container
        let streamingContainer = stepElement.querySelector('.streaming-text-container');
        if (!streamingContainer) {
            streamingContainer = document.createElement('div');
            streamingContainer.className = 'streaming-text-container';
            streamingContainer.style.cssText = `
                margin-top: 15px;
                padding: 15px;
                background: rgba(15, 23, 42, 0.8);
                border-radius: 8px;
                border-left: 3px solid #3b82f6;
                font-family: 'Courier New', monospace;
                font-size: 13px;
                line-height: 1.6;
                color: #e2e8f0;
                display: none;
            `;
            stepElement.querySelector('.step-content').appendChild(streamingContainer);
        }

        streamingContainer.style.display = 'block';
        streamingContainer.innerHTML = '';

        let currentTextIndex = 0;

        const displayNextText = () => {
            if (currentTextIndex < step.streamingTexts.length) {
                const textLine = document.createElement('div');
                textLine.style.cssText = `
                    margin-bottom: 8px;
                    opacity: 0.9;
                    padding: 4px 0;
                `;
                streamingContainer.appendChild(textLine);

                this.typewriterEffect(textLine, step.streamingTexts[currentTextIndex], () => {
                    currentTextIndex++;
                    setTimeout(displayNextText, 800); // Pause between lines
                }, 30); // Faster typing for individual lines
            } else if (callback) {
                setTimeout(callback, 1000);
            }
        };

        displayNextText();
    }

    startProgressBar() {
        let elapsedTime = 0;
        const updateInterval = 100; // Update every 100ms

        this.progressInterval = setInterval(() => {
            elapsedTime += updateInterval;
            const progressPercent = Math.min((elapsedTime / this.totalDuration) * 100, 100);

            // Update progress bar
            this.progressFill.style.width = `${progressPercent}%`;

            // Update time display with minutes and seconds
            const totalSeconds = Math.floor(elapsedTime / 1000);
            const minutes = Math.floor(totalSeconds / 60);
            const seconds = totalSeconds % 60;
            const totalMinutes = Math.floor(this.totalDuration / 60000);
            const totalSecondsRemainder = Math.floor((this.totalDuration % 60000) / 1000);

            this.progressTime.textContent = `Total time: ${minutes}:${seconds.toString().padStart(2, '0')} / ${totalMinutes}:${totalSecondsRemainder.toString().padStart(2, '0')} (${Math.round(progressPercent)}% complete)`;

            if (elapsedTime >= this.totalDuration) {
                clearInterval(this.progressInterval);
            }
        }, updateInterval);
    }

    processStep(stepIndex) {
        if (stepIndex >= this.steps.length) {
            this.completeDemo();
            return;
        }

        const step = this.steps[stepIndex];
        const stepElement = document.getElementById(step.id);
        const statusIndicator = stepElement.querySelector('.status-indicator');
        const statusText = stepElement.querySelector('.status-text');

        // Update progress status with typewriter effect
        const progressElement = this.progressStatus;
        this.typewriterEffect(progressElement, step.progressText, null, 40);

        // Activate current step
        stepElement.classList.add('active');
        statusIndicator.textContent = '⚙️';
        statusText.textContent = step.statusText;

        // Add processing animation
        this.addProcessingAnimation(stepElement);

        // Start streaming text display after a brief delay
        setTimeout(() => {
            this.displayStreamingTexts(stepIndex, () => {
                // After streaming texts complete, show sub-steps if available
                if (step.subSteps) {
                    this.displaySubSteps(stepIndex);
                }
            });
        }, 1000);

        // Complete step after duration
        setTimeout(() => {
            this.completeStep(stepIndex);
            this.processStep(stepIndex + 1);
        }, step.duration);
    }

    displaySubSteps(stepIndex) {
        const step = this.steps[stepIndex];
        const stepElement = document.getElementById(step.id);

        // Create sub-steps container
        let subStepsContainer = stepElement.querySelector('.sub-steps-container');
        if (!subStepsContainer) {
            subStepsContainer = document.createElement('div');
            subStepsContainer.className = 'sub-steps-container';
            subStepsContainer.style.cssText = `
                margin-top: 15px;
                padding: 12px;
                background: rgba(59, 130, 246, 0.1);
                border-radius: 6px;
                border: 1px solid rgba(59, 130, 246, 0.3);
            `;
            stepElement.querySelector('.step-content').appendChild(subStepsContainer);
        }

        subStepsContainer.innerHTML = '<div style="font-weight: 600; margin-bottom: 10px; color: #3b82f6;">Processing Sub-Steps:</div>';

        let currentSubStep = 0;
        const totalSubStepDuration = step.subSteps.reduce((sum, subStep) => sum + subStep.duration, 0);
        let elapsedTime = 0;

        const processSubStep = () => {
            if (currentSubStep < step.subSteps.length) {
                const subStep = step.subSteps[currentSubStep];
                const subStepElement = document.createElement('div');
                subStepElement.style.cssText = `
                    display: flex;
                    align-items: center;
                    margin: 6px 0;
                    padding: 6px 10px;
                    background: rgba(15, 23, 42, 0.6);
                    border-radius: 4px;
                    font-size: 12px;
                `;

                const progressBar = document.createElement('div');
                progressBar.style.cssText = `
                    width: 100px;
                    height: 4px;
                    background: rgba(59, 130, 246, 0.3);
                    border-radius: 2px;
                    margin-right: 10px;
                    overflow: hidden;
                `;

                const progressFill = document.createElement('div');
                progressFill.style.cssText = `
                    width: 0%;
                    height: 100%;
                    background: #3b82f6;
                    transition: width ${subStep.duration}ms linear;
                `;

                progressBar.appendChild(progressFill);
                subStepElement.appendChild(progressBar);

                const textElement = document.createElement('span');
                textElement.textContent = subStep.text;
                subStepElement.appendChild(textElement);

                subStepsContainer.appendChild(subStepElement);

                // Animate progress bar
                setTimeout(() => {
                    progressFill.style.width = '100%';
                }, 100);

                // Mark as complete after duration
                setTimeout(() => {
                    textElement.innerHTML = `✅ ${subStep.text}`;
                    progressFill.style.background = '#10b981';
                    currentSubStep++;
                    processSubStep();
                }, subStep.duration);

                elapsedTime += subStep.duration;
            }
        };

        processSubStep();
    }

    completeStep(stepIndex) {
        const step = this.steps[stepIndex];
        const stepElement = document.getElementById(step.id);
        const statusIndicator = stepElement.querySelector('.status-indicator');
        const statusText = stepElement.querySelector('.status-text');

        // Mark as completed
        stepElement.classList.remove('active');
        stepElement.classList.add('completed');
        statusIndicator.textContent = '✅';
        statusText.textContent = 'Completed';

        // Remove processing animation
        this.removeProcessingAnimation(stepElement);

        // Add completion effect
        this.addCompletionEffect(stepElement);
    }

    completeDemo() {
        // Clear progress interval
        if (this.progressInterval) {
            clearInterval(this.progressInterval);
        }

        // Clear any remaining typewriter timeouts
        if (this.currentTypewriterTimeout) {
            clearTimeout(this.currentTypewriterTimeout);
        }

        // Final progress updates with typewriter effect
        this.progressFill.style.width = '100%';
        this.typewriterEffect(this.progressStatus, '🎉 AI Order Processing Complete! Customer notified and order in fulfillment queue.', null, 30);
        this.progressTime.textContent = 'Total time: 270.0 / 270 seconds (4.5 minutes) - 85% faster than manual processing!';

        // Show results with enhanced messaging
        setTimeout(() => {
            this.resultsSection.classList.add('show');
            this.updateResultsForExtendedDemo();
        }, 2000);

        // Reset button state
        this.startBtn.disabled = false;
        this.startBtn.querySelector('.btn-text').textContent = 'Start Live Demo';
        this.startBtn.querySelector('.btn-icon').textContent = '▶';
        this.isRunning = false;

        // Add celebration effect
        this.addCelebrationEffect();

        // Increment order counter
        if (this.orderCounter) {
            const currentValue = parseInt(this.orderCounter.textContent.replace(/,/g, ''));
            this.orderCounter.textContent = (currentValue + 1).toLocaleString();
        }
    }

    updateResultsForExtendedDemo() {
        // Update the results summary to reflect the extended demo
        const summaryStats = this.resultsSection.querySelector('.summary-stats');
        if (summaryStats) {
            const stats = summaryStats.querySelectorAll('.stat');
            if (stats.length >= 4) {
                // Update time stat
                stats[0].querySelector('.stat-number').textContent = '4.5min';
                stats[0].querySelector('.stat-label').textContent = 'AI Processing Time';

                // Update cost saved (more realistic for longer process)
                stats[1].querySelector('.stat-number').textContent = '$247';
                stats[1].querySelector('.stat-label').textContent = 'Labor Cost Saved';

                // Keep accuracy and error stats the same
                stats[2].querySelector('.stat-number').textContent = '0';
                stats[2].querySelector('.stat-label').textContent = 'Human Errors';

                stats[3].querySelector('.stat-number').textContent = '99.8%';
                stats[3].querySelector('.stat-label').textContent = 'Accuracy Rate';
            }
        }
    }

    resetDemo() {
        // Clear any running intervals and timeouts
        if (this.progressInterval) {
            clearInterval(this.progressInterval);
        }
        if (this.currentTypewriterTimeout) {
            clearTimeout(this.currentTypewriterTimeout);
        }

        // Reset all steps
        this.steps.forEach((step) => {
            const stepElement = document.getElementById(step.id);
            const statusIndicator = stepElement.querySelector('.status-indicator');
            const statusText = stepElement.querySelector('.status-text');

            stepElement.classList.remove('active', 'completed');
            statusIndicator.textContent = '⏳';
            statusText.textContent = 'Waiting';
            this.removeProcessingAnimation(stepElement);

            // Clear streaming text and sub-steps containers
            const streamingContainer = stepElement.querySelector('.streaming-text-container');
            if (streamingContainer) {
                streamingContainer.remove();
            }
            const subStepsContainer = stepElement.querySelector('.sub-steps-container');
            if (subStepsContainer) {
                subStepsContainer.remove();
            }
        });

        // Reset progress bar
        this.progressFill.style.width = '0%';
        this.progressStatus.textContent = 'Ready to start AI-powered order processing demonstration';
        this.progressTime.textContent = 'Total time: 270 seconds (4.5 minutes)';

        // Hide results
        this.resultsSection.classList.remove('show');

        // Reset button state
        this.startBtn.disabled = false;
        this.startBtn.querySelector('.btn-text').textContent = 'Start Live Demo';
        this.startBtn.querySelector('.btn-icon').textContent = '▶';
        this.isRunning = false;
        this.currentStep = 0;
    }

    addProcessingAnimation(element) {
        // Add pulsing animation to the step
        element.style.animation = 'stepPulse 1.5s ease-in-out infinite';

        // Add spinning animation to step icon
        const icon = element.querySelector('.step-icon');
        if (icon) {
            icon.style.animation = 'iconSpin 2s linear infinite';
        }

        // Add pulse animation to step pulse element
        const pulse = element.querySelector('.step-pulse');
        if (pulse) {
            pulse.style.animation = 'pulseRing 2s ease-out infinite';
        }

        // Add thinking dots animation if present
        const thinkingDots = element.querySelector('.thinking-dots');
        if (thinkingDots) {
            thinkingDots.style.animation = 'thinkingDots 1.5s ease-in-out infinite';
        }
    }

    removeProcessingAnimation(element) {
        element.style.animation = '';

        const icon = element.querySelector('.step-icon');
        if (icon) {
            icon.style.animation = '';
        }

        const pulse = element.querySelector('.step-pulse');
        if (pulse) {
            pulse.style.animation = '';
        }

        const thinkingDots = element.querySelector('.thinking-dots');
        if (thinkingDots) {
            thinkingDots.style.animation = '';
        }
    }

    addCompletionEffect(element) {
        // Add completion glow effect
        element.style.boxShadow = '0 0 30px rgba(72, 187, 120, 0.6)';
        element.style.transform = 'scale(1.02)';

        // Add success particle effect
        this.createSuccessParticles(element);

        setTimeout(() => {
            element.style.boxShadow = '';
            element.style.transform = '';
        }, 1500);
    }

    createSuccessParticles(element) {
        const rect = element.getBoundingClientRect();
        const particles = ['✨', '⭐', '💫', '🌟'];

        for (let i = 0; i < 6; i++) {
            const particle = document.createElement('div');
            particle.textContent = particles[Math.floor(Math.random() * particles.length)];
            particle.style.cssText = `
                position: fixed;
                left: ${rect.left + rect.width / 2}px;
                top: ${rect.top + rect.height / 2}px;
                font-size: 20px;
                pointer-events: none;
                z-index: 1000;
                animation: particleFloat 2s ease-out forwards;
                animation-delay: ${i * 0.1}s;
            `;

            document.body.appendChild(particle);

            setTimeout(() => {
                if (document.body.contains(particle)) {
                    document.body.removeChild(particle);
                }
            }, 2000);
        }
    }

    addCelebrationEffect() {
        // Create multiple celebration elements
        const celebrations = ['🎉', '🎊', '✨', '🚀', '💫'];

        celebrations.forEach((emoji, index) => {
            const celebration = document.createElement('div');
            celebration.textContent = emoji;
            celebration.style.cssText = `
                position: fixed;
                top: ${20 + index * 15}%;
                left: ${20 + index * 15}%;
                font-size: ${60 + index * 10}px;
                z-index: 1000;
                animation: celebrate 3s ease-out forwards;
                animation-delay: ${index * 0.2}s;
                pointer-events: none;
            `;

            document.body.appendChild(celebration);

            setTimeout(() => {
                if (document.body.contains(celebration)) {
                    document.body.removeChild(celebration);
                }
            }, 3000);
        });

        // Add screen flash effect
        const flash = document.createElement('div');
        flash.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(72, 187, 120, 0.1);
            z-index: 999;
            animation: flashEffect 0.5s ease-out;
            pointer-events: none;
        `;

        document.body.appendChild(flash);

        setTimeout(() => {
            if (document.body.contains(flash)) {
                document.body.removeChild(flash);
            }
        }, 500);
    }
}

// Enhanced animations and effects
function addCustomStyles() {
    const style = document.createElement('style');
    style.textContent = `
        /* Enhanced Animations */
        @keyframes stepPulse {
            0%, 100% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.02); opacity: 0.95; }
        }

        @keyframes iconSpin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }

        @keyframes pulseRing {
            0% { transform: scale(0.8); opacity: 1; }
            100% { transform: scale(2); opacity: 0; }
        }

        @keyframes thinkingDots {
            0%, 20% { opacity: 0; }
            50% { opacity: 1; }
            100% { opacity: 0; }
        }

        @keyframes particleFloat {
            0% { transform: translate(0, 0) scale(1); opacity: 1; }
            100% {
                transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px) scale(0);
                opacity: 0;
            }
        }

        @keyframes celebrate {
            0% { transform: scale(0) rotate(0deg); opacity: 1; }
            50% { transform: scale(1.2) rotate(180deg); opacity: 1; }
            100% { transform: scale(0.8) rotate(360deg); opacity: 0; }
        }

        @keyframes flashEffect {
            0% { opacity: 0; }
            50% { opacity: 1; }
            100% { opacity: 0; }
        }

        /* Enhanced Step Styles */
        .flow-step {
            position: relative;
            overflow: visible;
        }

        .step-number {
            position: absolute;
            left: -15px;
            top: 15px;
            width: 30px;
            height: 30px;
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
            font-weight: 700;
            box-shadow: 0 4px 10px rgba(102, 126, 234, 0.3);
            z-index: 10;
        }

        .step-icon-container {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .step-pulse {
            position: absolute;
            width: 100%;
            height: 100%;
            border: 2px solid #667eea;
            border-radius: 50%;
            opacity: 0;
        }

        .flow-step.active .step-pulse {
            opacity: 0.6;
        }

        .step-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 8px;
        }

        .step-timing {
            background: rgba(102, 126, 234, 0.1);
            color: #667eea;
            padding: 4px 8px;
            border-radius: 12px;
            font-size: 11px;
            font-weight: 600;
        }

        .step-description {
            font-size: 14px;
            color: #718096;
            margin-bottom: 15px;
        }

        .flow-step.active .step-icon {
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
        }

        .flow-step.completed .step-icon {
            background: linear-gradient(135deg, #48bb78, #38a169);
            color: white;
            box-shadow: 0 8px 25px rgba(72, 187, 120, 0.4);
        }

        .flow-step.completed .step-number {
            background: linear-gradient(135deg, #48bb78, #38a169);
        }

        /* Progress Bar Enhancements */
        .progress-container {
            margin-bottom: 40px;
        }

        .progress-bar {
            width: 100%;
            height: 8px;
            background: #e2e8f0;
            border-radius: 4px;
            overflow: hidden;
            margin-bottom: 10px;
        }

        .progress-fill {
            height: 100%;
            background: linear-gradient(90deg, #667eea, #48bb78);
            border-radius: 4px;
            transition: width 0.3s ease;
            position: relative;
        }

        .progress-fill::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
            animation: progressShimmer 2s infinite;
        }

        @keyframes progressShimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
        }

        .progress-text {
            display: flex;
            justify-content: space-between;
            font-size: 14px;
            color: #4a5568;
        }

        /* Button Enhancements */
        .demo-btn {
            display: flex;
            align-items: center;
            gap: 8px;
            transition: all 0.3s ease;
        }

        .demo-btn:disabled {
            opacity: 0.6;
            cursor: not-allowed;
            transform: none !important;
        }

        .btn-icon {
            font-size: 16px;
        }

        .btn-text {
            font-weight: 600;
        }

        /* Counter Highlight */
        .counter-highlight {
            animation: counterPulse 0.5s ease-out;
        }

        @keyframes counterPulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); color: #48bb78; }
            100% { transform: scale(1); }
        }

        /* Step Details Enhancement */
        .step-details {
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.5s ease-out, opacity 0.3s ease-out;
            opacity: 0;
        }

        .flow-step.active .step-details,
        .flow-step.completed .step-details {
            max-height: 400px;
            opacity: 1;
        }
    `;
    document.head.appendChild(style);
}

// Smooth scrolling for better UX
function addSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Auto-scroll to active step
function scrollToActiveStep() {
    const activeStep = document.querySelector('.flow-step.active');
    if (activeStep) {
        activeStep.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
    }
}

// Control Points Tab Manager
class ControlPointsManager {
    constructor() {
        this.activeTab = 'exception-queue';
        this.init();
    }

    init() {
        // Initialize tab functionality
        this.initTabs();

        // Initialize interactive elements
        this.initInteractiveElements();
    }

    initTabs() {
        const tabs = document.querySelectorAll('.control-tab');
        const contents = document.querySelectorAll('.control-content');

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const targetTab = tab.getAttribute('data-tab');
                this.switchTab(targetTab);
            });
        });
    }

    switchTab(tabId) {
        // Update active tab
        document.querySelectorAll('.control-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tabId}"]`).classList.add('active');

        // Update active content
        document.querySelectorAll('.control-content').forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(tabId).classList.add('active');

        this.activeTab = tabId;
    }

    initInteractiveElements() {
        // Exception queue actions
        this.initExceptionActions();

        // Approval workflow actions
        this.initApprovalActions();

        // Regulation monitoring actions
        this.initRegulationActions();

        // Analytics actions
        this.initAnalyticsActions();
    }

    initExceptionActions() {
        document.querySelectorAll('.exception-item .action-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const action = btn.textContent.trim();
                const exceptionId = btn.closest('.exception-item').querySelector('.exception-id').textContent;
                this.handleExceptionAction(action, exceptionId, btn);
            });
        });
    }

    initApprovalActions() {
        document.querySelectorAll('.approval-actions .action-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const action = btn.textContent.trim();
                this.handleApprovalAction(action, btn);
            });
        });
    }

    initRegulationActions() {
        document.querySelectorAll('.alert-actions .action-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const action = btn.textContent.trim();
                const alertTitle = btn.closest('.alert-item').querySelector('.alert-title').textContent;
                this.handleRegulationAction(action, alertTitle, btn);
            });
        });
    }

    initAnalyticsActions() {
        document.querySelectorAll('.rec-actions .rec-btn, .optimization-recommendations .rec-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const action = btn.textContent.trim();
                const recTitle = btn.closest('.recommendation-item').querySelector('.rec-title').textContent;
                this.handleAnalyticsAction(action, recTitle, btn);
            });
        });
    }

    handleExceptionAction(action, exceptionId, button) {
        // Simulate action processing
        button.disabled = true;
        button.textContent = 'Processing...';

        setTimeout(() => {
            switch (action) {
                case 'Apply AI Suggestion':
                    this.showNotification('✅ AI suggestion applied successfully', 'success');
                    this.removeException(button.closest('.exception-item'));
                    break;
                case 'Manual Review':
                    this.showNotification('📋 Escalated to manual review queue', 'info');
                    break;
                case 'Contact Customer':
                    this.showNotification('📞 Customer contact initiated', 'info');
                    break;
                case 'Escalate to Manager':
                    this.showNotification('⬆️ Escalated to sales manager', 'warning');
                    break;
                case 'Counter-offer 15%':
                    this.showNotification('💰 Counter-offer sent to customer', 'info');
                    break;
                case 'Reject':
                    this.showNotification('❌ Exception rejected', 'error');
                    this.removeException(button.closest('.exception-item'));
                    break;
            }

            button.disabled = false;
            button.textContent = action;
        }, 1500);
    }

    handleApprovalAction(action, button) {
        button.disabled = true;
        button.textContent = 'Processing...';

        setTimeout(() => {
            switch (action) {
                case 'Approve with Conditions':
                    this.showNotification('✅ Order approved with conditions', 'success');
                    this.updateApprovalStatus('APPROVED');
                    break;
                case 'Reject Override':
                    this.showNotification('❌ Credit override rejected', 'error');
                    this.updateApprovalStatus('REJECTED');
                    break;
                case 'Modify Terms':
                    this.showNotification('✏️ Terms modification initiated', 'info');
                    break;
                case 'Escalate to VP':
                    this.showNotification('⬆️ Escalated to VP approval', 'warning');
                    break;
            }

            button.disabled = false;
            button.textContent = action;
        }, 2000);
    }

    handleRegulationAction(action, alertTitle, button) {
        button.disabled = true;
        button.textContent = 'Processing...';

        setTimeout(() => {
            switch (action) {
                case 'Review Affected Orders':
                    this.showNotification('🔍 Reviewing affected orders...', 'info');
                    break;
                case 'Update Compliance Rules':
                    this.showNotification('⚖️ Compliance rules updated', 'success');
                    break;
                case 'Prepare Compliance Plan':
                    this.showNotification('📋 Compliance plan initiated', 'info');
                    break;
                case 'Notify Suppliers':
                    this.showNotification('📧 Suppliers notified', 'success');
                    break;
                case 'Update Tax Engine':
                    this.showNotification('💰 Tax engine updated', 'success');
                    break;
                case 'Notify Customers':
                    this.showNotification('📧 Customer notifications sent', 'success');
                    break;
            }

            button.disabled = false;
            button.textContent = action;
        }, 1500);
    }

    handleAnalyticsAction(action, recTitle, button) {
        button.disabled = true;
        button.textContent = 'Processing...';

        setTimeout(() => {
            switch (action) {
                case 'Implement':
                    this.showNotification('🚀 Implementation started', 'success');
                    this.markRecommendationImplemented(button.closest('.recommendation-item'));
                    break;
                case 'Learn More':
                    this.showNotification('📖 Opening detailed analysis...', 'info');
                    break;
                case 'Create Rule':
                    this.showNotification('⚙️ Automation rule created', 'success');
                    break;
                case 'Review Pattern':
                    this.showNotification('🔍 Pattern analysis opened', 'info');
                    break;
                case 'Enhance Algorithm':
                    this.showNotification('🧠 Algorithm enhancement queued', 'success');
                    break;
                case 'View Analysis':
                    this.showNotification('📊 Analysis dashboard opened', 'info');
                    break;
            }

            button.disabled = false;
            button.textContent = action;
        }, 1500);
    }

    removeException(exceptionElement) {
        exceptionElement.style.animation = 'slideOut 0.5s ease-out forwards';
        setTimeout(() => {
            exceptionElement.remove();
            this.updateExceptionCount();
        }, 500);
    }

    updateExceptionCount() {
        const remainingExceptions = document.querySelectorAll('.exception-item').length;
        const badge = document.querySelector('.control-content#exception-queue .dashboard-badge');
        if (badge) {
            badge.textContent = `${remainingExceptions} Items Pending`;
        }
    }

    updateApprovalStatus(status) {
        const approvalItem = document.querySelector('.approval-item');
        if (approvalItem) {
            approvalItem.style.animation = 'fadeOut 0.5s ease-out forwards';
            setTimeout(() => {
                const badge = document.querySelector('.control-content#approval-workflow .dashboard-badge');
                if (badge) {
                    badge.textContent = '0 Pending Approval';
                }
                approvalItem.innerHTML = `
                    <div class="approval-completed">
                        <div class="completion-icon">${status === 'APPROVED' ? '✅' : '❌'}</div>
                        <div class="completion-text">
                            <h3>${status === 'APPROVED' ? 'Approval Completed' : 'Request Rejected'}</h3>
                            <p>Credit override request has been ${status.toLowerCase()}</p>
                        </div>
                    </div>
                `;
                approvalItem.style.animation = 'fadeIn 0.5s ease-out forwards';
            }, 500);
        }
    }

    markRecommendationImplemented(recElement) {
        recElement.style.opacity = '0.6';
        recElement.querySelector('.rec-priority').textContent = 'IMPLEMENTED';
        recElement.querySelector('.rec-priority').style.background = '#48bb78';

        const actions = recElement.querySelector('.rec-actions');
        actions.innerHTML = '<span class="implementation-status">✅ Implementation in progress</span>';
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;

        document.body.appendChild(notification);

        // Auto-remove after 4 seconds
        setTimeout(() => {
            if (document.body.contains(notification)) {
                notification.style.animation = 'slideOut 0.3s ease-out forwards';
                setTimeout(() => {
                    if (document.body.contains(notification)) {
                        document.body.removeChild(notification);
                    }
                }, 300);
            }
        }, 4000);

        // Close button functionality
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.style.animation = 'slideOut 0.3s ease-out forwards';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        });
    }
}

// Initialize demo when page loads
document.addEventListener('DOMContentLoaded', function () {
    // Add custom styles
    addCustomStyles();

    // Add smooth scrolling
    addSmoothScrolling();

    // Initialize the demo
    const demo = new OrderProcessingDemo();

    // Initialize control points manager
    const controlPoints = new ControlPointsManager();

    // Add scroll-to-step functionality
    const originalProcessStep = demo.processStep.bind(demo);
    demo.processStep = function (stepIndex) {
        originalProcessStep(stepIndex);
        setTimeout(scrollToActiveStep, 100);
    };

    // Add keyboard shortcuts
    document.addEventListener('keydown', function (e) {
        if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            if (!demo.isRunning) {
                demo.startDemo();
            }
        } else if (e.key === 'Escape' || e.key === 'r') {
            demo.resetDemo();
        }
    });

    // Add touch/mobile support
    let touchStartY = 0;
    document.addEventListener('touchstart', function (e) {
        touchStartY = e.touches[0].clientY;
    });

    document.addEventListener('touchend', function (e) {
        const touchEndY = e.changedTouches[0].clientY;
        const diff = touchStartY - touchEndY;

        // Swipe up to start demo
        if (diff > 50 && !demo.isRunning) {
            demo.startDemo();
        }
        // Swipe down to reset
        else if (diff < -50) {
            demo.resetDemo();
        }
    });

    console.log('🚀 Agentic AI Demo loaded successfully!');
    console.log('💡 Keyboard shortcuts: Space/Enter = Start, Escape/R = Reset');
    console.log('📱 Mobile: Swipe up = Start, Swipe down = Reset');
});

// Export for potential external use
window.OrderProcessingDemo = OrderProcessingDemo;
