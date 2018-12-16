import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ModuleWithProviders} from '@angular/core/src/metadata/ng_module';
import {CityPipe} from './pipes/city.pipe';
import { ClickWithWarningDirective } from './clickWithWarning.directive';

@NgModule({
   imports: [
      CommonModule
   ],
   declarations: [
      CityPipe,
      ClickWithWarningDirective
   ],
   exports: [
      CityPipe,
      ClickWithWarningDirective
   ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: []
    }
  }

  static forChild(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: []
    }
  }

}
