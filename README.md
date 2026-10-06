### Struktura projektu
- /foobar.com
- /css
- /js
- /images
- /html (stranky, podstranky)
    - /news
        - /news_content
            - fizz.html
            - buzz.html
        - news.html
    - about.html
    - contact.html
- index.html 


### VPS

Stránky jsou hostované na www.cechhlin.cz. Běží na VPSku s ip 46.175.135.207.

Deyploment:
- scp -r ./* root@46.175.135.207:/var/www/cechhlin/
    - To funguje v případě že jsi zrovna ve složce Čechlín
- (na serveru) systemctl reload caddy