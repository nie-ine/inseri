/**
 * Created by Reto Baumgartner (rfbaumgartner) on 09.02.18.
 */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageFrameComponent } from '../../src/modules/image-frame/image-frame.component';
import {FormsModule} from '@angular/forms';

describe('ImageFrameComponent', () => {
    let component: ImageFrameComponent;
    let fixture: ComponentFixture<ImageFrameComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [ ImageFrameComponent ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ImageFrameComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
