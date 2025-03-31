export class Utils {
    // static nos sirve aca porque estas son utilidades y no necesita inicializar propiedades

    static toggleModal(modal) {
        modal.classList.toggle('hidden');
    }

    static setupModalEvents(modal, closeButton, form = null, onSubmit = null) {
        closeButton.addEventListener('click', () => this.toggleModal(modal));

        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.toggleModal(modal);
            }
        });

        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
                this.toggleModal(modal);
            }
        });

        if (form && onSubmit) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                onSubmit();
                this.toggleModal(modal);
            });
        };
    }

    static openImageModal(evt, modal, imageModal, titleModal) {
        const clickedImage = evt.target;

        if (clickedImage.classList.contains('galery__item-image')) {
            imageModal.src = clickedImage.src;
            imageModal.alt = clickedImage.alt;

            titleModal.textContent = clickedImage.alt;
            modal.classList.toggle('hidden');
        }

    }
}