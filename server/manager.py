import random
import numpy as np
import uuid

class Manager:
    def __init__(self, uploadDirectory):
        self.uploadDirectory = uploadDirectory

    def myfunc(self, N, addingcolumns):
        arr = np.array([[]])
        for i in addingcolumns:
            arr = np.append(arr, [[i['ColumnName']]])
        for i in range(N, 0, -1):
            arr2 = np.array([[]])
            for x in addingcolumns:
                if (x['Domain'] == '0'):
                    string = self.stringfunction(x['Input'])
                    arr2 = np.append(arr2, string)
                else:
                    integer = self.integerfunction(x['Input'])
                    arr2 = np.append(arr2, integer)
            arr = np.vstack((arr, arr2))
        print(arr)
        filename = str(uuid.uuid4())[:5] + '.csv'
        np.savetxt(self.uploadDirectory + '/' + filename, arr, delimiter=',', comments='', fmt='%s')
        return filename

    def stringfunction(self, input):
        result = random.choice(input.split(','))
        return result

    def integerfunction(self, input):
        min = int(input.split(',')[0])
        max = int(input.split(',')[1])
        result = random.randint(min, max)
        return result


# m = Manager()
# addingcolumns = [{'ColumnName': 'State', 'Input': 'PA,LA,NJ,NY', 'Domain': '0'}, {
#     'ColumnName': 'Party', 'Input': '10,900', 'Domain': '1'}]
# m.myfunc(5, addingcolumns)
