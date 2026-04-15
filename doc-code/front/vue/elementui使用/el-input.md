> el-input 输入框 输入整数

```
    onCustomSizeInput(val) {
      // Filter out non-digit characters
      const filteredVal = val.toString().replace(/[^0-9]/g, '');

      // Update the value
      if (filteredVal !== val.toString()) {
        this.customPageSize = filteredVal || '';
      }
    }
```
