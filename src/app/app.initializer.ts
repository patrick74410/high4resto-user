import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer, Meta } from '@angular/platform-browser';
import { first } from 'rxjs/operators';
import { HomePageService } from 'src/services/home.service';

// Provide an initializer function that returns a Promise
export const appInitializer = (
    homePageService: HomePageService,
    metaService: Meta,
    iconRegistry: MatIconRegistry,
    domSanitizer: DomSanitizer
) => {
    return () => {
        iconRegistry.addSvgIconSet(
            domSanitizer.bypassSecurityTrustResourceUrl('./assets/mdi.svg')
        );

        return homePageService.homePage$
            .pipe(first())
            .toPromise()
            .then((homePage) => {
                metaService.addTags([
                    {
                        name: 'description',
                        content: homePage.metaTag.description,
                    },
                    { name: 'keywords', content: homePage.metaTag.keywords },
                    { name: 'author', content: homePage.metaTag.author },
                    {
                        name: 'robots',
                        content: 'index, follow',
                    },
                    {
                        name: 'og:title',
                        content: homePage.metaTag.facebookTitle,
                    },
                    {
                        name: 'og:description',
                        content: homePage.metaTag.facebookDescription,
                    },
                    {
                        name: 'og:image',
                        content: homePage.metaTag.facebookImage,
                    },
                    {
                        name: 'twitter:title',
                        content: homePage.metaTag.twitterTitle,
                    },
                    {
                        name: 'twitter:description',
                        content: homePage.metaTag.twitterDescription,
                    },
                    {
                        name: 'twitter:image',
                        content: homePage.metaTag.twitterImage,
                    },
                    {
                        name: 'twitter:creator',
                        content: homePage.metaTag.twitterAuthor,
                    },
                ]);
                homePage.metaTag.other.forEach((keyMap) => {
                    metaService.addTag({
                        name: keyMap.key,
                        content: keyMap.value,
                    });
                });
            }); // Set the config that was loaded asynchronously here
    };
};
