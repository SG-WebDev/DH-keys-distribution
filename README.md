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

- [ ] Napisanie dokumentacji projektowej

## Problematyka problemu

Problematyka czatów grupowych i poufności informacji wymienianych przez użytkowników oscyluje między kilkoma ważnymi filarami, z których
kompromitacja dowolnego może dopuścić do ujawnienia informacji wymienianych między użytkownikami.
Głównymi filarami wymiany wiadomości w formie niejawnej end-to-end są:
-wybór algorytmu szyfrowania między użytkownikami
-wybór algorytmu wymiany kluczy między użytkownikami
-implementacja ww. algorytmów
-bezpieczne przechowywanie haseł do szyfru
-bezpieczna dystrybucja kluczy

### Opis


### Znane rozwiązanie

### Algorytmy

### Źródła

## Założenia projektowe

### Wybór rozwiązania

### Alternatywne rozwiązania

## Wybrane technologie

## Motywacja wyboru stosu technologicznego

## Projekt interfejsu
[Link do makiet](https://www.behance.net/gallery/132467319/Chat-Room)

![UI Desktop](/docs-assets/ui-desktop.jpg "UI Desktop")

![UI Desktop](/docs-assets/style-guide.jpg "Style Guide")

## Architektura, Algorytm

## Ocena jakości, wydajności, bezpieczeństwa

## Przykłady użycia
