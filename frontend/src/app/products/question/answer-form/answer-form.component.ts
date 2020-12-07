import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IQuestion, QuestionsService } from '../../questions.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';




@Component({
  selector: 'app-answer-form',
  templateUrl: './answer-form.component.html',
  styleUrls: ['./answer-form.component.css']
})
export class AnswerFormComponent implements OnInit {
  answerForm = new FormGroup({
    text: new FormControl('', [Validators.required]),
  });

  @Input() question: IQuestion;


  constructor(
    private questionService: QuestionsService,
    public router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) { 
  }

  ngOnInit(): void {
    const questionId = this.route.snapshot.paramMap.get('id');
    this.questionService.get(questionId).subscribe( question  => {
      this.question = question;
    })
  }

  answerQuestion(): void {
    const text = this.answerForm.get('text').value;
    const questionId =  this.question.id; 
    this.questionService.answer(questionId, text).subscribe((res) => {
      this.location.back();
    }) 
  }

  goBack(): void {
    this.location.back();
  }
}
