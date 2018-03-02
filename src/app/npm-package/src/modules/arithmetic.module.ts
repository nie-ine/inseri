import { NgModule, ModuleWithProviders } from '@angular/core';
import { SumService } from '../services/sum.service';
import { ExampleComponent } from './exampleComponent/example.component';
import { ImageFrameSizesComponent } from './image-frame/image-frame-sizes.component';
import { ImageFrameComponent } from './image-frame/image-frame.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        ExampleComponent,
        ImageFrameComponent,
        ImageFrameSizesComponent
        // Pipes.
        // Directives.
        // Components.
    ],
    exports: [
        ExampleComponent,
        ImageFrameComponent,
        ImageFrameSizesComponent
        // Pipes.
        // Directives.
        // Components.
    ],
    imports: [
        CommonModule,
        FormsModule
    ]
})
// Consider registering providers using a forRoot() method
// when the module exports components, directives or pipes that require sharing the same providers instances.
// Consider registering providers also using a forChild() method
// when they requires new providers instances or different providers in child modules.
export class ArithmeticModule {

    /**
     * Use in AppModule: new instance of SumService.
     */
    public static forRoot(): ModuleWithProviders {
        return {
            ngModule: ArithmeticModule,
            providers: [
                SumService,
                ExampleComponent,
                ImageFrameComponent,
                ImageFrameSizesComponent
            ],
        };
    }

    /**
     * Use in features modules with lazy loading: new instance of SumService.
     */
    public static forChild(): ModuleWithProviders {
        return {
            ngModule: ArithmeticModule,
            providers: [
                SumService,
                ExampleComponent,
                ImageFrameComponent,
                ImageFrameSizesComponent
            ]
        };
    }

}
