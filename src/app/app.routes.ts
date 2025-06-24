import { Routes } from '@angular/router';

import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { DocsLayoutComponent } from './layouts/docs-layout/docs-layout.component';

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
import { CommonTemplateComponent } from './pages/common-template/common-template.component';
import { DemoComponent } from './pages/demo/demo.component';
import { IosSDKComponent } from './docs/ios-sdk/ios-sdk.component';
import { AndroidSDKComponent } from './docs/android-sdk/android-sdk.component';
import { OverviewComponent } from './docs/overview/overview.component';
import { DocsFAQComponent } from './docs/docs-faq/docs-faq.component';
import { CreativesComponent } from './pages/creatives/creatives.component';
import { AdvertiseComponent } from './pages/advertise/advertise.component';

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
            { path: 'publishers', component: CommonTemplateComponent },
            { path: 'advertise', component: AdvertiseComponent },
            { path: 'creatives', component: CreativesComponent },
            { path: 'demo', component: DemoComponent },
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
        path: 'docs',
        component: DocsLayoutComponent,
        children: [
            { path: '', redirectTo: 'overview', pathMatch: 'full' },
            { path: 'overview', component: OverviewComponent },
            { path: 'ios', component: IosSDKComponent },
            { path: 'android', component: AndroidSDKComponent },
            { path: 'faqs', component: DocsFAQComponent },
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
