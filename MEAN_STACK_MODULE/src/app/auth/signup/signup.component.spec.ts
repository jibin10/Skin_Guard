import { TestBed, ComponentFixture } from '@angular/core/testing';
import { BrowserModule, By} from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DebugElement} from '@angular/core';

import { SignupComponent } from './signup.component';

describe('SignupComponent', () => {
  let comp: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let deb_elem: DebugElement;
  let htm_elem: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        RouterTestingModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        FormsModule
      ],
      declarations: [
        SignupComponent
      ],
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(SignupComponent);
      comp = fixture.componentInstance;
      deb_elem = fixture.debugElement.query(By.css('form'));
      htm_elem = deb_elem.nativeElement;
    });
  });

  it(`should have as title 'Sign Up'`, () => {
    expect(comp.title).toEqual('Sign Up');
  });

  it(`form submitted`, () => {
    comp.onSignup();
    expect(comp.submitted).toBeTruthy();
  });

  it(`call onsubmit`, () => {
    fixture.detectChanges();
    spyOn(comp, 'onSignup');
    htm_elem = fixture.debugElement.query(By.css('button')).nativeElement;
    htm_elem.click();
    comp.onSignup();
    expect(comp.onSignup).toHaveBeenCalledTimes(0);
  });


  it(`form should be invalid`, () => {

    comp.signupForm.controls['name'].setValue('');
    comp.signupForm.controls['role'].setValue('');
    comp.signupForm.controls['phone'].setValue('');
    comp.signupForm.controls['email'].setValue('');
    comp.signupForm.controls['password'].setValue('');
    comp.signupForm.controls['confirm_password'].setValue('');

    expect(comp.signupForm.valid).toBeFalsy();
  });

  /* it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement as HTMLElement;
    expect(compiled.querySelector('title')?.textContent).toContain('SkinGuard');
  }); */

});
