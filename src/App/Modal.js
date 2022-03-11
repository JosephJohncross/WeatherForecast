export class Modal{
    constructor(container) {
        this.modalContainer = container; 
    }

    generateModal(addClass) {
        const modal = document.createElement('div');
        modal.className = "modal";
        modal.classList.add(addClass);
        this.modalContainer.append(modal);
        modal.style.height = "max-content";
        return modal;
    }
}