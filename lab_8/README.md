- General Header: This type of headers applied on Request and Response headers both but with out affecting the database body.
- Request Header: This type of headers contains information about the fetched request by the client.
- Response Header: This type of headers contains the location of the source that has been requested by the client.
- Entity Header: This type of headers contains the information about the body of the resources like MIME type, Content-length.

[Источник](https://www.geeksforgeeks.org/http-headers/)

---
#### Поясните назначение заголовка `Content-Type`.

`Content-Type` - **заголовок сущности** (Entity Header), используется для того, чтобы
определить MIME тип данных в теле запроса / ответа.

---
#### Поясните назначение заголовка `Accept`.

HTTP заголовок запроса Accept указывает, какие типы контента,
выраженные как MIME типы, клиент может понять.

---
#### Для чего используется значение `Multipart/form-data` заголовка `Content-Type`.

Тип содержимого multipart/form-data — это составной тип содержимого,
чаще всего использующийся для отправки HTML-форм с бинарными (не-
ASCII) данными методом POST протокола HTTP.

---
#### Как с помощью тега `<form>`, обеспечить значение `Multipart/form-data`

```html
<form enctyp="multipart/form-data">
...
</form>
```
---
#### Какое значение заголовка `Content-Type` отправляется тегом form в запросе по умолчанию.

`application/x-www-form-urlencoded`

---
#### Где и в каком формате передаются параметры в GET-запросе?

В адресной строке, в query params в виде ключ-значение.

---
#### Где и в каком формате передаются параметры в POST-запросе?

В теле запроса в формате, указанном в `Content-Type`.

---
#### Поясните понятие JSON?

JSON (JavaScript Object Notation) - простой формат обмена данными,
удобный для чтения и написания как человеком, так и компьютером.

```json
{
    "name": "name",
    "age": 20,
    "pocket": [
        "apple",
        "orange",
    ],
    "smelov": "loh"
}
```
