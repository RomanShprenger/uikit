#Welcome to Yengo UI Kit Package

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3333](http://localhost:3333) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run lint`

Launches ESLint. The pluggable linting utility for JavaScript and JSX.<br>
See the section «[Getting Started with ESLint](https://eslint.org/docs/user-guide/getting-started)» for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.



## Testing
1. Для тестирования необходимо создать файлы в папке компонента. `<ComponentName>.test.js` и `<ComponentName>.e2e.test.js`.
2. В `<ComponentName>.test.js` тестируется внешний вид (вёрстка компонентов, все возможные варианты компонента), в `<ComponentName>.e2e.test.js` - внешний вид после различных действий с компонентом (focus, click, blur etc).
3. Тесты состоят из тест-кейсов `it()` и группируются в тест-планы `describe()`. Тест-план именуется как _"Test: <заголовок>"_, а тест-план: - _"Should <что делает> correctly"_.

**Документация:**
[enzyme](https://enzymejs.github.io/enzyme/docs/api/), 
[jest](https://jestjs.io/docs/en/getting-started)

**`<ComponentName>.test.js`**

В начале теста необходимо создать адаптер (необходим для того, чтобы тесты работали вне зависимости от версии React'а).
```
Enzyme.configure({
  adapter: new Adapter(),
});
```

Дальше составляем тесты, основанные на возможностях компонента, объединяя их в тест-планы.

**Простейший пример рендера компонента и сохранения снепшота:**
```
it('Should render primary Button correctly', () => {
    const tree = renderer
      .create(<Button kind="primary" />)
      .toJSON();

    expect(tree).toMatchSnapshot();
});
```
**Пример рендера компонента после совершения действия над ним:**
```
it('Should render Button after hover correctly', () => {
    const wrapper = mount(<Button />);
    wrapper.find('button').simulate('mouseenter');
    expect(toJson(wrapper, { mode: 'deep' })).toMatchSnapshot();
});
```
`mount` позволяет сделать рендер компонента с `children`. 

**`<ComponentName>.e2e.test.js`**

В начале теста необходимо создать адаптер (необходим для того, чтобы тесты работали вне зависимости от версии React'а).
```
Enzyme.configure({
  adapter: new Adapter(),
});
```
Дальше составляются тесты, основанные на действиях, которые можно совершить с компонентом. Построение аналогично тестам выше.

**Пример простого теста:**
```
it('Should button be focused', () => {
    const onFocus = jest.fn();

    const button = shallow(<Button
      onFocus={onFocus}
    />);

    button.props().onFocus();
    expect(onFocus.mock.calls.length).toBe(1);
  });
```
**Пример с добавлением класса и проверки его наличия:**
```
it('Should button have custom class', () => {
    const button = shallow(<Button
      className="customClass"
    />);

    expect(button.hasClass('customClass')).toBe(true);
});
```
Для запуска тестов выполняем скрипт `test-components` из package.json и выбираем все тесты или только часть (см консоль по запуску). 

Если тест выдает отличающийся результат (снепшоты), то необходимо проверить, если изменения ожидаемые, то в таком случае обновляем снепшот, в противном случае – правим компонент.

Снэпшоты сохраняются в папку `<Component>/__snapshots__`. При первом проходе (после создания теста) необходимо проверить снэпшоты на соответствие ожидаемому результату.


## Testing HOC

1. Тестирование направлено на прохождение всех кейсов с условием (if).
2. Как и при обычном тестировании охватывает все корректные и некорректные случаи.
3. При запуске тестов, можно глянуть процент покрытия. Числами указаны строки, которые не покрыты тестами, обычно они находятся как раз в условиях.

В начале файла снова используем адаптер:
```
Enzyme.configure({
  adapter: new Adapter(),
});
```

Создаем блок тестов, с соответствующим названием (относительно компонента):
```
describe('Test: withSomeState HOC', () => { });
```
В корне этого блока можно создать тестовые классы, так как для enzyme необходимо передать класс, а иногда требуются данные не по дефолту, а передать `<Component id="0" />` нельзя.
```
class ComponentDisabled extends React.PureComponent {
    render() {
      return (
        <TextField disabled />
      );
    }
  }
```
Далее в каждый it блок оформляем 1 кейс:
```
it('should render the component and not to change the state (default - true)', () => {
    const ConditionalComponent = withFocusedState(ComponentWithFocus);
    const wrapper = mount(<ConditionalComponent />);

    expect(wrapper.find(ComponentWithFocus)
      .props().focused)
      .toEqual(true);
  });
```
Необходимо использовать mount.

Для симуляции пользовательских действий необходимо использовать такой вариант (обратить внимание на вариант с чекбоксом):
```
wrapper.find('input')
    .simulate('focus');

wrapper.find('input')
    .simulate('change', {
        target: {
            id: '0',
            checked: true,
        },
    });
```

Для проверки, что в компоненте добавлен или не добавлен элемент, использовать следующую функцию:
```
expect(wrapper.find('.yui-input__helper--counter')).toHaveLength(0); // 1 - существует, 0 - нет
```

Иногда результат отображается не в props(), а в каком-либо элементе. Например, counterText можно найти таким образом:
```
expect(wrapper.find('.yui-input__helper--counter')
    .props().children)
    .toEqual('32/32');
```
