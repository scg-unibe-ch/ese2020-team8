import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {IQuestion} from '../../questions.service';

@Component({
  selector: 'app-product-question-answers',
  templateUrl: './question-answers.component.html',
  styleUrls: ['./question-answers.component.css']
})
export class QuestionAnswersComponent implements OnInit {

  panelOpenState;

  @Input() questions: IQuestion[];
  @Input() isOwnProduct: boolean;
  @Output() goToEvent = new EventEmitter();

  constructor(
  ) { }

  ngOnInit(): void {
  }

}
