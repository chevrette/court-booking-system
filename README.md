## Wstęp

Twoje zadanie polega na napisaniu bardzo uproszczonego systemu do rezerwacji kortów w centrum sportowym.

Frontend systemu powinien zostać napisany z użyciem React.js ([https://reactjs.org/](https://reactjs.org/)),
natomiast backend będzie uruchamiany w środowisku node.js ([https://nodejs.org/en/](https://nodejs.org/en/)) 
z użyciem frameworka Express.js ([https://expressjs.com/](https://expressjs.com/)). Komunikacja pomiędzy klientem
i serwerem ma się odbywać z wykorzystaniem REST API i formatu JSON. Wszystko oczywiście w języku 
JavaScript.

Jako podstawy dla aplikacji, użyj projektu, który właśnie przeglądasz.
Powstał on przy pomocy narzędzia `create-react-app` ([https://github.com/facebook/create-react-app](https://github.com/facebook/create-react-app)) 
i został wzbogacony o backend.

## Zadanie

Centrum sportowe potrzebuje prostej aplikacji internetowej, która umożliwi rezerwacje on-line kortów do tenisa.
Centrum pracuje w godzinach 6:00 - 22:00 i posiada sześć kortów tenisowych oznaczonych numerami od 1 do 6. Rezerwacji dokonuje 
się zawsze na **jedną pełną godzinę** np. 15:00 - 16:00.

Dla uproszczenia przyjmujemy, że system obsługuje dane **tylko dla jednego dnia** więc można zupełnie pominąć datę.
Wymagane są natomiast następujące funkcjonalności:

#### 1. Wyświetlenie statusu rezerwacji

Aktualny status rezerwacji na cały dzień powinien zostać wyświetlony w postaci tabelki, gdzie dla każdej kombinacji 
kortu i godziny będzie można odczytać status (dostępny/zarezerwowany)

#### 2. Rezerwacja wybranego kortu i terminu

Jeżeli dany termin jest wolny, użytkownik powinien móc go zarezerwować. Podczas rezerwacji powinien być on 
poproszony o podanie swojego imienia (nazwy). Dla uproszczenia nie jest wymagana żadna 
predefiniowana lista użytkowników czy logowanie, po prostu można wpisać cokolwiek.
Po wszystkim użytkownik powinien zostać poinformowany o udanej rezerwacji, a tabela odświeżona.  

#### 3. Wyświetlenie podstawowych statystyk o rezerwacjach

Poniżej tabeli strona powinna wyświetlać podstawowe statystyki dotyczące rezerwacji:
- procentowe zajęcie wszystkich kortów razem w ciągu dnia
- procentowe zajęcie w ciągu dnia z podziałem na poszczególne korty
- liczba dokonanych rezerwacji z podziałem na użytkowników posortowana malejąco po liczbie rezerwacji

Przykładowe statystyki:
```
zajęcie kortów:  razem    42.17%
                 kort 1   27%
                 kort 2   68%
                 kort 3   13%
                 kort 4   90%
                 kort 5   45%
                 kort 6   10%
rezerwacje:      tomek    6
                 anna     5
                 jan      3
                 kasia    1
                 michal   1
```

## Szczegóły techniczne

#### Uruchomienie

Zainstaluj node.js w wersji >=10. Upewnij się, że `node` oraz `npm` (node package manager) są dodane do `PATH`. 

Przed pierwszym uruchomieniem aplikacji należy pobrać wszystkie potrzebne zależności. Aby to zrobić, przejdź
do głównego katalogu projektu (tam, gdzie znajduje sie plik `package.json`) i uruchom:
```
npm install
```
Nie przejmuj się ostrzeżeniami podczas instalacji. Kiedy polecenie się wykona i  wszystkie zależności zostaną pobrane, możesz uruchomić aplikację. 
W trybie developerskim backend i frontend to dwie oddzielne aplikacje i tak też muszą być uruchamiane
(poniższych poleceń również należy używać z głównego katalogu projektu).

Uruchomienie frontendu:

```
npm start
```

Uruchomienie backendu:
```
npm run server
```

Kiedy frontend i backend wystartują, aplikacja będzie dostępna pod `http://localhost:3000`. Sam backend działa
na porcie `4000`, ale dzięki odpowiedniej konfiguracji requesty są przekazywane z portu `3000` na `4000`.

Zmiany w kodzie frontendu będą automatycznie widoczne w przeglądarce, natomiast po zmianie kodu serwera 
należy uruchomić go jeszcze raz.

W tej chwili strona robi jedno zapytanie do API o przykładowy tekst i wyświetla go.

#### Uwagi i wskazówki

* Dla uproszczenia **aplikacja nie musi współpracować z żadną zewnętrzną bazą danych**. Dane na temat rezerwacji wystarczy przechowywać
w pamięci serwera (czyli zezwalamy na ich utratę po restarcie).
* Dodanie innych bibliotek nie jest koniecznie, ale jak najbardziej dozwolone (w tym Bootstrap).
* Nie jest ważne działanie aplikacji w trybie produkcyjnym, wystarczy,
że aplikacja działa poprawnie po uruchomieniu powyższych komend.
* Jesteś bardziej frontendowcem i nie zajmowałeś się nigdy backendem? A może wręcz przeciwnie -
świetnie sobie radzisz na serwerze, ale drżysz przed CSSem?
Nie zniechęcaj się i zrób to, co potrafisz - szukamy ludzi o różnych profilach. 
