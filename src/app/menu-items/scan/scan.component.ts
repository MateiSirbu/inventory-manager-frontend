import { Component, OnInit } from '@angular/core';
import { BarcodeFormat } from '@zxing/library';
import { Router } from '@angular/router';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.component.html',
  styleUrls: ['./scan.component.css']
})
export class ScanComponent implements OnInit {

  torchEnabled = false;
  tryHarder = false;
  currentDevice: MediaDeviceInfo = null;
  formats = [BarcodeFormat.QR_CODE];
  availableDevices: MediaDeviceInfo[];
  hasPermission: boolean;
  data: string = null;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onPermissionResponse(permission: boolean) {
    this.hasPermission = permission;
  }

  onCamerasFound(devices: MediaDeviceInfo[]) {
    this.availableDevices = devices;
  }

  onScanSuccess(data: string) {
    this.data = data;
    this.router.navigate(['/item/' + data]);
  }

}
