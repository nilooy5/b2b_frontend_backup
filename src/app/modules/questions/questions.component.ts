import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {PopAlertService} from '../pop-alert/pop-alert.service';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {BehaviorSubject} from 'rxjs';

@Component({
    selector: 'app-questions',
    templateUrl: './questions.component.html',
    styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit, OnDestroy {
    questions: any[] = [];
    questionForms: FormGroup[] = [];
    questionTypes: any[] = [
        {
            title: 'Short Answer',
            value : 'text',
            icon: 'short_text'
        },
        {
            title: 'Long Answer',
            value: 'textarea',
            icon: 'format_align_left'
        },
        {
            title: 'Multiple Choice',
            value: 'radio',
            icon: 'radio_button_checked'
        },
        {
            title: 'Checkbox',
            value: 'checkbox',
            icon: 'check_box'
        },
    ];
    activeQuestionType = 'text';
    newOptionName: string;
    selectedType: any;
    previousEditIndex: number;

    @Input() initialQuestions: any[] = [];
    @Output() update: EventEmitter<any> = new EventEmitter();

    private EditIndex = new BehaviorSubject<any>(-1);
    fixed$ = this.EditIndex.asObservable();

    private set editIndex(value: any) {
        if (this.previousEditIndex !== value) {
            this.saveQuestion(this.previousEditIndex);
        }
        this.EditIndex.next(value);
        this.previousEditIndex = value;
    }

    private get editIndex(): any {
        return this.EditIndex.getValue();
    }

    constructor(
        private fb: FormBuilder,
        private pop: PopAlertService
    ) {
        this.editIndex = 0;
    }

    ngOnInit() {
        this.handleInitialQuestions();
        this.updateQuestions();
    }

    ngOnDestroy(): void {
        this.saveQuestion(this.editIndex);
    }

    handleInitialQuestions() {
        if (this.initialQuestions.length > 0) {
            this.initialQuestions.forEach((question) => {
                this.questions.push(question);
            });
            this.selectedType = this.questionTypes.find(q => q.value === this.questions[0].type);
        } else {
            this.addQuestion();
            this.selectedType = this.questionTypes[0];
        }
        this.editIndex = 0;
        this.previousEditIndex = 0;
    }

    updateQuestions() {
        this.questionForms = [];
        this.questions.forEach((question, index) => {
            this.questionForms[index] = this.fb.group({});
            for (const key in question) {
                if (question.hasOwnProperty(key)) {
                    this.questionForms[index].addControl(key, new FormControl(question[key]));
                }
            }
        });
        this.exportData();
    }

    addQuestion() {
        this.saveQuestion(this.editIndex);
        this.questions.splice(this.editIndex + 1, 0, {
            question: '',
            type: 'text',
            required: true,
            options: []
        });

        this.updateQuestions();
        this.editIndex = this.editIndex + 1;
    }

    deleteQuestion(index) {
        this.questions.splice(index, 1);

        this.updateQuestions();

        this.editIndex = -1;
    }

    copyQuestion(i) {
        this.submitQuestion(i);
        this.questions.splice(this.editIndex + 1, 0, this.questions[i]);
        this.updateQuestions();
        this.editIndex = i + 1;
    }

    submitQuestion(index) {
        this.saveQuestion(index);
        this.editIndex = -1;
    }

    saveQuestion(index) {
        const questionData = this.questionForms[index];
        if (questionData) {
            this.questions[index] = questionData.getRawValue();
            this.updateQuestions();
        }
    }

    editQuestion(index) {
        this.editIndex = index;
    }

    exportData() {
        const exportData = [];
        this.questionForms.forEach(form => {
            exportData.push(form.getRawValue());
        });
        this.update.emit(exportData);
    }

    handleActiveQuestionTypeChange({value}, questionIndex?) {

        if (value) {
            this.activeQuestionType = value;
            this.selectedType = this.questionTypes.find(q => q.value === value);

            if (value === 'radio' || value === 'checkbox') {
                if (this.questions[questionIndex].options.length === 0) {
                    this.addOptionToQuestion(questionIndex, 'option 1', 0);
                    // this.questions[questionIndex].type = value;
                }

            } else {
                // this.questions[questionIndex].options = [];
                this.questionForms[questionIndex].value.options = [];
                // this.questions[questionIndex].type = value;
            }
        }
        const exportData = [];
        this.questionForms.forEach(item => {
            exportData.push(item.value);
        });
        this.update.emit(exportData);
    }

    addOptionToQuestion(index, content, oIndex?, event?) {
        if (event) { event.preventDefault(); }
        this.questions[index].options.push(content);
        setTimeout(() => {
            document.getElementById('option_' + index + oIndex).focus();
        }, 300);
    }

    updateOption(option, index, {target}) {
        option.options[index] = target.value;
        target.focus();
    }

    deleteOption(option, index) {
        option.options.splice(index, 1);
    }

    trackByFn(index: any, item: any) {
        return index;
    }

    drop(event: CdkDragDrop<string[]>) {
        moveItemInArray(this.questionForms, event.previousIndex, event.currentIndex);
        moveItemInArray(this.questions, event.previousIndex, event.currentIndex);

        this.editIndex = event.currentIndex;
    }

    getSelectedType(type) {
        return this.questionTypes.find(t => t.value === type);
    }

    onChangeQuestion() {
        const exportData = [];
        this.questionForms.forEach(form => {
            exportData.push(form.getRawValue());
        });
        this.update.emit(exportData);
    }
}
