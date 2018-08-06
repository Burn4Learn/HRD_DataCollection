DECLARE @id int = (SELECT ID FROM BatteryTracking WHERE SerialNumber = @serial)
IF @id IS NULL
BEGIN
    INSERT INTO BatteryTracking (SerialNumber, CreateDate) VALUES(@serial, GETDATE())
    SET @id = SCOPE_IDENTITY()
END
SELECT @id