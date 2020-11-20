import { APP_INITIALIZER, NgModule } from '@angular/core';
import { AuthClientConfig, AuthModule } from '@auth0/auth0-angular';
import { WebConfigService } from 'src/services/webConfig.service';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { configInitializer } from './configInitializer';

@NgModule({
  imports: [AppModule, AuthModule.forRoot()],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: configInitializer, // <- pass your initializer function here
      deps: [WebConfigService, AuthClientConfig],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppBrowserModule {}
