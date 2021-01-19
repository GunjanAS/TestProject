import random,  uuid
import numpy as np

class Manager:
    def __init__(self, uploadDirectory):
        self.uploadDirectory = uploadDirectory
        self.batchSize = 1000

    def myfunc(self, N, addingcolumns):
        filename = str(uuid.uuid4())[:5] + '.csv'
        rows = np.array([[]])

        for i in addingcolumns:
            rows = np.append(rows, [[i['ColumnName']]])

        fd = open(self.uploadDirectory + '/' + filename, 'a+')

        for i in range(0, N, 1):
            if(i > 0 and i % self.batchSize == 0):
                np.savetxt(fd, rows, delimiter=',', comments='', fmt='%s')
                rows = np.array([[]])
            row = np.array([[]])
            for x in addingcolumns:
                if (x['Domain'] == '0'):
                    string = self.stringfunction(x['Input'])
                    row = np.append(row, string)
                else:
                    integer = self.integerfunction(x['Input'])
                    row = np.append(row, integer)

            if (len(rows) < 1):
                rows = row
            else:
                rows = np.vstack((rows, row))
        np.savetxt(fd, rows, delimiter=',', comments='', fmt='%s')
        fd.close()
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
