emailjs.init("8FL7phInRwQ0F_98V");

        document.querySelector('#sendBtn').addEventListener('click', () => {
            const name = document.querySelector('#name').value.trim();
            const email = document.querySelector('#email').value.trim();
            const subject = document.querySelector('#subject').value.trim();
            const message = document.querySelector('#message').value.trim();

            // Clear all previous errors
            document.querySelectorAll('.error').forEach(e => e.classList.remove('show'));
            document.querySelectorAll('input, textarea').forEach(e => e.classList.remove('input-error'));

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            let hasError = false;

            if (!name) {
                document.querySelector('#name-error').classList.add('show');
                document.querySelector('#name').classList.add('input-error');
                hasError = true;
            }
            if (!email || !emailRegex.test(email)) {
                document.querySelector('#email-error').classList.add('show');
                document.querySelector('#email').classList.add('input-error');
                hasError = true;
            }
            if (!subject) {
                document.querySelector('#subject-error').classList.add('show');
                document.querySelector('#subject').classList.add('input-error');
                hasError = true;
            }
            if (!message) {
                document.querySelector('#message-error').classList.add('show');
                document.querySelector('#message').classList.add('input-error');
                hasError = true;
            }

            if (hasError) return;

            const templateParams = {
                name: name,
                email: email,
                subject: subject,
                messages: message,
                time: new Date().toLocaleString()
            };

            const btn = document.querySelector('#sendBtn');
            btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
            btn.disabled = true;

            emailjs.send('service_7vq2yoh', 'template_5hz0ihm', templateParams)
                .then(() => {
                    btn.innerHTML = '<i class="fa-solid fa-check"></i> Message Sent!';
                    btn.style.background = 'rgba(0, 200, 100, 0.3)';
                    document.querySelector('#name').value = '';
                    document.querySelector('#email').value = '';
                    document.querySelector('#subject').value = '';
                    document.querySelector('#message').value = '';
                    setTimeout(() => {
                        btn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send Message';
                        btn.style.background = '';
                        btn.disabled = false;
                    }, 3000);
                })
                .catch((error) => {
                    console.error('EmailJS error:', error);
                    btn.innerHTML = '<i class="fa-solid fa-xmark"></i> Failed. Try again.';
                    btn.style.background = 'rgba(200, 0, 0, 0.3)';
                    btn.disabled = false;
                    setTimeout(() => {
                        btn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send Message';
                        btn.style.background = '';
                    }, 3000);
                });
        });