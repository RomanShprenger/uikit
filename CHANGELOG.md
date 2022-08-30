# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/) and this project adheres to [Semantic Versioning](http://semver.org/).


## [Released]

## [0.5.1] - 2019-06-05
- \#25910: Fixed call static method in pagination (#102)

## [0.5.0] - 2019-06-04
- \#25883: Компонент Tooltip (#101)

## [0.4.0] - 2019-06-03
- \#25687: компонент Popover (#100)

## [0.3.0] - 2019-05-21

- \#25499: Мобильная версия компонента Pagination (#99)
- \#25499: Компонент Pagination (#98)

## [0.2.6] - 2019-04-25

- \#25502: Изменен sticky header (#97)

## [0.2.5] - 2019-04-10

- \#25282: Cтилизация кнопок giraff
- \#25379: Обновление компонента TextField

## [0.2.4] - 2019-04-05

- \#24456: Styles for Giraff table

## [0.2.3] - 2019-03-28

- \#25200: Обновлены иконки Giraff для конструктора (#93)

## [0.2.2] - 2019-03-27

- \#25200: Обновлены кривые иконки Giraff

## [0.2.1] - 2019-03-27

- \#25200: Обновлены иконки Giraff

## [0.2.0] - 2019-03-27

- \#25050: Indeterminate state for checkbox added 
- \#25200: Заменены иконки Giraff

## [0.1.9] - 2019-03-21

- \#25050: Исправлено поведение клонированого хедера в таблице 
- \#25050: Исправлен баг со старым клонированым хедером 

## [0.1.7 - 0.1.8] - 2019-03-13

- \#24973: Исправление иконок (#87)
- \#24918: стилизация Select для проекта giraff (#84)

## [0.1.6] - 2019-03-12

- \#24973: Добавлены новые иконки жирафа (#85)

## [0.1.5] - 2019-03-05

- \#24902: добавлен компонент Radio (#83)
- \#24766: стилизация TextField для giraff (#78)

## [0.1.4] - 2019-03-05

- \#24895: Изменен способ подключения иконочных шрифтов (#82)

## [0.1.3] - 2019-02-28

- \#24815: Добавлены иконки (#77)
- \#24545: исправление паддингов у TextField (#76)
- \#24802: added temporary fix for linter (#73)
- \#24545: добавлена возможность добавлять иконки в TextField (#70)
- \#23896: added fix for react intl (#71)
- \#24457: Cтилизованы кнопки для Жирафа (#67)
- \#24402: Fixed bug with header group cloning
- \#24547: Fixed issue with font generation(#64)
- \#24402: Fixed header now cloned with header group, header and footer as total

## [0.1.2] - 2019-01-09
### Added
- `withStickyHeader` prop added to `Table`, `Table` now can have header that will be always visible
- added status icons 
- exported beaver colors  

## [0.1.1] - 2018-12-19
### Added
- CHANGELOG.md
- `Select` component styled
- `Select` component now accepts `icon` prop (from `Icons`)
- Added `withEmptyState` HOC
- Added sort icon styles

### Changed
- `TextField` styles for beaver
- Fixed `withFocusedState` HOC

## [0.1.0] - 2018-12-18
- `Button` component with layouting and stories
- `Checkbox` + `Switcher` component with layouting and stories
- `Icon` component with layouting and stories
- `Select` (based on `react-select`) component and stories
- `Table` (based on `react-table`) component with layouting and stories 
- `TextField` component with layouting and stories
- Fonts generator and template for fonts generator
- Linting based on `airbnb` config
- Minimum version check for `node` (version 9)
- `Husky` and pre-push hook that build project before push  
