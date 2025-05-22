import { Routes } from '@angular/router';

import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { HomeComponent } from './pages/home/home.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { GuideComponent } from './pages/guide/guide.component';
import { MediaKitComponent } from './pages/media-kit/media-kit.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { TermsOfServicesComponent } from './pages/terms-of-services/terms-of-services.component';

import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { NewPasswordComponent } from './auth/new-password/new-password.component';
import { VerifyOtpComponent } from './auth/verify-otp/verify-otp.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ComingSoonComponent } from './pages/coming-soon/coming-soon.component';
import { DemoComponent } from './pages/demo/demo.component';
import { CommonTemplateComponent } from './pages/common-template/common-template.component';

export const routes: Routes = [

    // With navbar/footer
    {
        path: '',
        component: MainLayoutComponent,
        children: [
            { path: '', component: HomeComponent },
            { path: 'about-us', component: AboutUsComponent },
            { path: 'contact-us', component: ContactUsComponent },
            { path: 'guide', component: GuideComponent },
            { path: 'media-kit', component: MediaKitComponent },
            { path: 'privacy-policy', component: PrivacyPolicyComponent },
            { path: 'terms-of-service', component: TermsOfServicesComponent },
            { path: 'demo', component: DemoComponent },
            { path: 'landing', component: CommonTemplateComponent },
        ]
    },

    // Without navbar/footer
    {
        path: 'auth',
        component: AuthLayoutComponent,
        children: [
            { path: 'sign-up', component: SignupComponent },
            { path: 'login', component: LoginComponent },
            { path: 'forgot-password', component: ForgotPasswordComponent },
            { path: 'reset-password', component: ResetPasswordComponent },
            { path: 'new-password', component: NewPasswordComponent },
            { path: 'verify-otp', component: VerifyOtpComponent },
        ]
    },
    {
        path: '',
        component: AuthLayoutComponent,
        children: [
            { path: 'coming-soon', component: ComingSoonComponent },
            { path: '**', component: NotFoundComponent },
        ]
    }

];
