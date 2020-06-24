/********************************************************************************
 * Copyright (C) 2020 Ericsson and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v. 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0.
 *
 * This Source Code may also be made available under the following Secondary
 * Licenses when the conditions for such availability set forth in the Eclipse
 * Public License v. 2.0 are satisfied: GNU General Public License, version 2
 * with the GNU Classpath Exception which is available at
 * https://www.gnu.org/software/classpath/license.html.
 *
 * SPDX-License-Identifier: EPL-2.0 OR GPL-2.0 WITH Classpath-exception-2.0
 ********************************************************************************/

import { webContents } from 'electron';
import { injectable } from 'inversify';
import { ElectronMainContribution } from './electron-application';
const nativeKeymap = require('native-keymap');

@injectable()
export class ElectronNativeKeymap implements ElectronMainContribution {

    /**
     * Notify all renderer processes on keyboard layout change.
     */
    onStart(): void {
        nativeKeymap.onDidChangeKeyboardLayout(() => {
            const newLayout = {
                info: nativeKeymap.getCurrentKeyboardLayout(),
                mapping: nativeKeymap.getKeyMap()
            };
            for (const webContent of webContents.getAllWebContents()) {
                webContent.send('keyboardLayoutChanged', newLayout);
            }
        });
    }

}