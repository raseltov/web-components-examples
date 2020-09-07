class UxTextarea extends HTMLTextAreaElement {
    constructor() {
        super();
        this.initialValue = this.getValue();
        this.value = this.initialValue;
        this.valueHistory = new Set([this.initialValue]);
        this.currentPositionInHistory = 0;

        this.historyRecording = () => this.addToHistory();
        this.frequentRecording = setInterval(this.historyRecording, 2000);
    }
    addToHistory() {
        this.valueHistory.add(this.getValue());
        console.log(this.valueHistory);
    }
    getValue() {
        return this.value.trim();
    }
    browseHistory(steps = 0) {
        clearInterval(this.frequentRecording);
        let arr = Array.from(this.valueHistory),
            historyTarget = (this.currentPositionInHistory ? this.currentPositionInHistory : arr.length - 1) + steps;
        if (arr[historyTarget]) {
            this.currentPositionInHistory = historyTarget;
            this.value = arr[historyTarget];
            this.onchange = () => {
                this.frequentRecording = setInterval(this.addToHistory, 2000);
            }
        }
    }
}

customElements.define('ux-textarea', UxTextarea, { extends: 'textarea' });
