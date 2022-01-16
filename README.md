# Metody szyfrowania wiadomości oraz dystrybucji kluczy - dokumentacja
Prosty chat webowy z szyfrowaniem wiadomości z dystrybucją kluczy opartą o algorytm Diffi'ego Hellmana

## Podział prac

#### Dorota Skowronek

- [x] Inicjacja projektu serwera
- [x] Stworzenie Hub'a Web Socketów na serwerze
- [x] Obsługa chatu - serwer

#### Szymon Biskup

- [x] Uwierzytelnianie usera - serwer
- [x] Obsługa logowania usera - klient


#### Szymon Grobelny

- [x] Inicjacja projektu klienta
- [x] Projekt interfejsu
- [x] Struktura i wygląd ekranów aplikacji
- [x] Obsługa chatu w aplikacji

#### Cezary Szpotek

- [x] Implementacja dystrybucji kluczy (DH) dla wielu userów
- [x] Implementacja sekretu do szyfru
- [x] Implementacja algorytmu szyfrowania (AES) wiadomości

#### Wszyscy

- [x] Napisanie dokumentacji projektowej

## Problematyka problemu

Problematyka czatów grupowych i poufności informacji wymienianych przez użytkowników oscyluje między kilkoma ważnymi filarami, z których kompromitacja dowolnego z nich może dopuścić do ujawnienia informacji wymienianych między użytkownikami.

Bezpieczeństwo wymiany wiadomości w formie niejawnej zależy od:
- wybór trybu szyfrowania, jego formy oraz założeń koncepcyjnych
- wybór algorytmu szyfrowania symetrycznego między użytkownikami
- wybór algorytmu wymiany kluczy między użytkownikami
- implementacja ww. algorytmów i ich bezpieczne użycie
- bezpieczne przechowywanie kluczy i ich dystrybucja

### Opis
W projekcie zakładającym utworzenie czatu grupowego z zaimplementowanym szyfrowaniem postawiono na rozwiązanie typu end-to-end. Jest to metoda szyfrowania oparta na szyfrowaniu oraz deszyfrowaniu wiadomości na końcach węzła, w tym przypadku na urządzeniach końcowych.

W dystrybucji kluczy i ich ustaleniu miał pomóc algorytm Diffiego-Hellmana oparty na krzywych eliptycznych, który w sposób jawny pozwala na przekazanie klucza publicznego.

Do szyfrowania samych wiadomości wybrano algorytm AES256 w trybie Cipher Block Chaining z użyciem wektora inicjalizacji.


### Znane rozwiązanie
**Signal, Telegram, Wire**

Powyższe aplikacje szyfrują (lub mają nie domyślną opcję szyfrowania w przypadku Telegrama) dane przesyłane między użytkownikami takie jak pliki, wiadomości tekstowe lub głosowe.

Wszystkie powyższe komunikatory gromadzą minimalne dane identyfikacyjne swoich użytkowników pomijając dane wrażliwe np. dotyczące geolokalizacji, finansów, zawartości wiadomości chatów i historię przeglądania. Gromadzone dane są zapisywane w postaci zaszyfrowanej.

Każdy z nich również ma mechanizm automatycznego usuwania wiadomości po wygaśnięciu sesji aplikacji.

Powyższa charakterystyka sprawia, że wymienione aplikacje są stosunkowo bezpieczne w porównaniu z innymi popularnymi komunikatorami na rynku np Facebook Messenger lub Apple iMessage.


### Algorytmy
**ECDH** - anonimowy protokół uzgadniania kluczy. Pozwala on obu stronom (gdzie każda z nich posiada parę kluczy: prywatnego i publicznego, opartych na krzywych eliptycznych) na przesyłanie danych niejawnych poprzez niezabezpieczony kanał. Dane te mogą zostać bezpośrednio użyte jako klucz, lub też można wydzielić z nich inne klucze. Mogą one następnie zostać użyte do odszyfrowania kolejnych transmisji za pomocą algorytmu symetrycznego. Jest to odmiana protokołu Diffiego-Hellmana wykorzystująca kryptografię krzywych eliptycznych.

**AES256** - symetryczny szyfr blokowy o 256 bitowej długości klucza. Operuje na macierzy bajtów o wymiarach 4×4, nazywaną stanem. Jednak niektóre wersje algorytmu dysponują większym rozmiarem bloku oraz dodatkowymi kolumnami w macierzy. Większość obliczeń AES'a dokonywanych jest w konkretnym ciele skończonym. Rozmiar klucza używany w algorytmie określa liczbę powtórzeń transformacji, które przekształcają dane wejściowe (czyli tekst jawny) w dane wyjściowe (szyfrogram). Liczba cykli powtórzeń dla klucza 256-bitowego wynosi 14 cykli.

Wszystkie rundy składają się z kilku kroków, z których każdy rozłożony jest na cztery podobne (lecz nie identyczne) etapy.

Wykonując operacje w odwrotnej kolejności używając tego samego klucza, można przekształcić szyfrogram z powrotem w tekst jawny.


### Źródła

* https://pl.wikipedia.org/wiki/Protok%C3%B3%C5%82_Diffiego-Hellmana_w_przestrzeni_krzywych_eliptycznych
* https://pl.wikipedia.org/wiki/Advanced_Encryption_Standard
* https://nodejs.org/api/crypto.html
* http://safecurves.cr.yp.to/

## Założenia projektowe

- Utworzenie czatu grupowego
- Utworzenie mechanizmów asynchronicznej wymiany danych
- Utworzenie warstwy graficznej czatu
- Implementacja API oraz zewnętrznego serwera do wymiany danych
- Implementacja mechanizmów wymiany kluczy oraz algorytmu szyfrowania symetrycznego

### Wybór rozwiązania

**ECDH** - wybór krzywej Montgomerego Curve25519 został podyktowany bezpieczeństwem, kompletnością oraz szybkością generowania krzywej na tle innych krzywych na podstawie strony safecurves.
**AES256** - wybrano metodę szyfrowania bloków danych CBC z użyciem wektora inicjalizacji. Mechanizm zaimplementowany został z użyciem natywnej biblioteki node - crypto.


### Alternatywne rozwiązania

Rozwiązaniem alternatywnym do trybu działania czatu mogłoby być użycie protokołu TLS, który w wieloetapowym kontakcie między użytkownikiem, a np serwerem ustala metodykę oraz tryby wymiany danych w sposób poufny. Postawiono jednak na rozwiązanie, które jest niezależne od protokołu i które umożliwia dostęp do danych jedynie użytkownikom końcowym, a nie jest łącznikiem między użytkownikiem a dostawcą usług.

Wybór mechanizmów szyfrowania oraz wymiany klucza również posiadał dużo alternatyw, postawiono jednak na sprawdzone rozwiązania autoryzowane przez NIST. Alternatywą dla algorytmu symetrycznego mógłby być blowfish, jako algorytm asymetryczny np: RSA. Wybór podyktowany był jednak powszechnością użytkowania algorytmów DH i AES.

Krzywą eliptyczną Montgomerego wybrano ze względu na równą długość kluczy prywatnych, publicznych i utworzonych przez nich sekretów, co znacząco ułatwia obliczenia kluczy. Pozostałe krzywe często posiadały niedoskonałości mogące ułatwić kryptoanalizę, bądź zwracały różne długości sekretu, co utrudniało obliczenia na wybranym stacku technologicznym.


## Wybrane technologie
* **HTML** - struktura widoków aplikacji
* **CSS** - kaskadowe arkusze styli aplikacji nadające wygląd strukturze
* **JavaScript** - skryptowy język programowania użyty do manipulacji na drzewie DOM**
* C# - wieloparadygmatowy język programowania
* **ASP.NET Core** - zbiór bibliotek i narzędzi, umożliwiających tworzenie aplikacji internetowych
* **SignalR** - biblioteka dla ASP.NET umożliwiająca na wysyłanie ,w czasie rzeczywistym, asynchronicznych powiadomień do aplikacji internetowych po stronie klienta
* **WebSocket** - protokół komunikacyjny wykorzystywany w bibliotece SignalR, zapewniający dwukierunkowy kanał komunikacyjny za pośrednictwem jednego gniazda TCP


## Motywacja wyboru stosu technologicznego

Motywacją do wybrania powyższego stosu technologicznego był fakt znajomości technologii webowych przez członków grupy wykonującej projekt, oraz wyzwanie w połączeniu ich z szyfrowaniem end-to-end. Jest to rozwiązanie mało spopularyzowane w technologiach webowych.

Kolejnym argumentem była możliwość wykonania stosunkowo łatwej implementacji asynchronicznego mechanizmu czatu działającego w czasie rzeczywistym z pomocą WebSocketów i JavaScriptu.


## Projekt interfejsu
[Link do makiet](https://www.behance.net/gallery/132467319/Chat-Room)

![UI Desktop](/docs-assets/ui-desktop.jpg "UI Desktop")

![UI Desktop](/docs-assets/style-guide.jpg "Style Guide")

## Działanie algorytmu
**Opis algorytmu Diffiego-Hellmana opartego na krzywych eliptycznych:**

Algorytm wykonuje obliczenia przy użyciu własnego klucza prywatnego oraz otrzymanego klucza publicznego drugiej osoby. W ten sposób otrzymuje się sekret, który w przypadku dwóch użytkowników może służyć jako klucz do szyfru symetrycznego.

W przypadku wielu użytkowników, sekret wymieniony musi być wielokrotnie i po każdym obliczeniu jest on przekazywany kolejnemu użytkownikowi (zasada tzw: “każdy z każdym”) aż do momentu, w którym wszyscy użytkownicy przemieszają swoje klucze publiczne i sekrety.

**Przykład dla 4 użytkowników:**

Wykonujemy (n-1) “rund”. W tym przypadku jedna runda z wymianą kluczy publicznych i dwie z wymianą sekretów:

Najpierw wymiana samych kluczy publicznych i obliczenie pierwszych sekretów. Sześć linijek symbolizuje sześciu użytkowników:

* _1prywatny  2publiczny_
* _2prywatny  3publiczny_
* _3prywatny  4publiczny_
* _4prywatny  1publiczny_

Potem każdy nawias to kolejny sekret. Po obliczeniu 4 nowych sekretów następuje wymiana między użytkownikami:

* _1 (2 3)_
* _2 (3 4)_
* _3 (4 1)_
* _4 (1 2)_

Ostatnia pętla, po której każdy użytkownik otrzymuje dokładnie ten sam sekret:

* _1 (2 (3 4))_
* _2 (3 (4 1))_
* _3 (4 (1 2))_
* _4 (1 (2 3))_



## Ocena jakości, wydajności, bezpieczeństwa

Pomimo prób zaimplementowania czatu w sposób jak najbardziej zbliżony do rzeczywistego nie wszystkie pierwotnie zakładane założenia udało się spełnić. Fakt ten wynikał z trudności asynchronicznej wymiany danych między wszystkimi użytkownikami biorącymi udział w wymianie klucza.

W związku z faktem, że przeszkodą nie był brak znajomości metod szyfrowania czy algorytmów postanowiono zaimplementować strukturę użytkowników w sposób lokalny i w tenże sam sposób obliczyć klucze dla “uczestników” czatu.

Po obliczeniu kluczy otrzymuje się poprawne wyniki. Sekret zostaje przypisany do lokalnej bazy danych, dzięki czemu użytkownicy pracujący w ramach tej samej przeglądarki są w stanie poprawnie szyfrować oraz deszyfrować wiadomości. W tym samym czasie inna przegladarka nie jest w stanie odczytać danych, widzi je w postaci zaszyfrowanej.

Przez ten fakt wymiana klucza nie została zabezpieczona również w żaden sposób przed przechwyceniem wymiany klucza publicznego i atakami MITM.

Pomimo tego jesteśmy w stanie stwierdzić, że wymiana kluczy oraz szyfrowanie i deszyfrowanie wiadomości przebiegają poprawnie.

