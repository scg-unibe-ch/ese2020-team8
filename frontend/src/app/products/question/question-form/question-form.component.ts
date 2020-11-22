import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct, ProductsService } from '../../products.service';
import { QuestionsService } from '../../questions.service';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.css']
})
export class QuestionFormComponent implements OnInit {

  questionForm = new FormGroup({
    text: new FormControl('', [Validators.required]),
  });

  @Input() product: IProduct;

  constructor(
    private questionService: QuestionsService,
    public router: Router,
    private route: ActivatedRoute,
    private productService: ProductsService,
  ) { }


  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    this.productService.get(productId).subscribe( product  => {
      this.product = product;
    })
  }

  askQuestion(): void {
    const text = this.questionForm.get('text').value;
    const productId = this.product.id;
    this.questionService.ask(productId, text).subscribe((res) => {
      console.log(res);
      //this.router.navigate(['products', product.id, 'show']);
    }) 
  }
}



