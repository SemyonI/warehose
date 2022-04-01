import { Dispatch, FC, Fragment, SetStateAction } from 'react';

import { Product } from 'src/@types/products';
import { mockWarehouses } from 'src/mockData';

import { Button } from 'src/components/UI/atoms/Button';
import { Input } from 'src/components/UI/atoms/Input';
import { MediumText, Text } from 'src/components/UI/atoms/typography/styledComponents';
import { SelectWrapper } from 'src/components/UI/molecules/WarehouseDistribution/styledComponents';

interface WarehouseDistributionProps {
  newProduct: Product;
  setNewProduct: Dispatch<SetStateAction<Product>>;
}

export const WarehouseDistribution: FC<WarehouseDistributionProps> = ({ newProduct, setNewProduct }) => (
  <SelectWrapper>
    {+newProduct.amount ? (
      <>
        <MediumText>Распределение по складам:</MediumText>
        {newProduct.warehouses.map((warehouse) => (
          <Fragment key={Math.random()}>
            <Text>Выберете склад</Text>
            <select
              key={warehouse.id}
              value={warehouse.id}
              onChange={(e) => {
                const selectWarehouse = mockWarehouses.find(
                  (el) => el.id === +e.target.options[e.target.options.selectedIndex].value,
                );
                if (selectWarehouse) {
                  if (!newProduct.warehouses.find((el) => el.id === selectWarehouse.id)) {
                    setNewProduct((prev) => ({
                      ...prev,
                      warehouses: prev.warehouses.map((el) => {
                        if (el.id === warehouse.id) {
                          return { ...selectWarehouse, amount: '0' };
                        }
                        return el;
                      }),
                    }));
                  }
                }
              }}
            >
              {mockWarehouses.map((mockWarehouse) => (
                <option key={mockWarehouse.id} value={mockWarehouse.id}>
                  {mockWarehouse.name}
                </option>
              ))}
            </select>
            {!!warehouse.name && (
              <Input
                label="Количество"
                type="number"
                initialValue={warehouse.amount}
                setInitialValue={(value) =>
                  setNewProduct((prev) => ({
                    ...prev,
                    warehouses: prev.warehouses.map((el) => (el.id === warehouse.id ? { ...el, amount: value } : el)),
                  }))
                }
              />
            )}
          </Fragment>
        ))}
        {!newProduct.warehouses.length && (
          <select
            onChange={(e) => {
              const selectWarehouse = mockWarehouses.find(
                (el) => el.id === +e.target.options[e.target.options.selectedIndex].value,
              );
              if (selectWarehouse) {
                setNewProduct((prev) => ({
                  ...prev,
                  warehouses: [...prev.warehouses, { ...selectWarehouse, amount: '0' }],
                }));
              }
            }}
          >
            {mockWarehouses.map((mockWarehouse) => (
              <option key={mockWarehouse.id} value={mockWarehouse.id}>
                {mockWarehouse.name}
              </option>
            ))}
          </select>
        )}
        {!!newProduct.warehouses.length && (
          <Button
            text="добавить склад"
            onClick={() =>
              setNewProduct((prev) => ({
                ...prev,
                warehouses: [...prev.warehouses, { id: Math.random(), name: '', amount: '0' }],
              }))
            }
          />
        )}
      </>
    ) : (
      <span>Введите количество продукции для распределения по складам</span>
    )}
  </SelectWrapper>
);
